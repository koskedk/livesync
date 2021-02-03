import {
  CommandBus,
  EventsHandler,
  IEventHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { IndicatorStagedEvent } from '../indicator.staged.event';
import { UpdateStatusCommand } from '../../commands/update-status.command';
import { GetIndicatorQuery } from '../../queries/get-indicator-query';
import { Indicator } from '../../../../domain/indicator.entity';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';

@EventsHandler(IndicatorStagedEvent)
export class IndicatorStagedHandler implements IEventHandler<IndicatorStagedEvent> {
  constructor(
    private readonly config: ConfigService,
    private readonly client: MessagingService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: IndicatorStagedEvent) {
    let indicators = [];
    Logger.debug(`=== Publishing IndicatorStagedEvent ===:${event.id}`);

    indicators = await this.queryBus.execute<GetIndicatorQuery, Indicator[]>(
      new GetIndicatorQuery({ id: event.id }),
    );

    for (const indicator of indicators) {
      try {
        const result = await this.client.publish(
          JSON.stringify(indicator),
          this.config.QueueStatsExchange,
          this.config.getRoute(Indicator.name.toLowerCase()),
        );

        if (result) {
          await this.commandBus.execute(
            new UpdateStatusCommand(indicator.id, Indicator.name, 'SENT'),
          );
        } else {
          await this.commandBus.execute(
            new UpdateStatusCommand(
              indicator.id,
              Indicator.name,
              'ERROR',
              'Unkown Publish Error',
            ),
          );
        }
      } catch (e) {
        Logger.error(`PUBLISH`, e);
        await this.commandBus.execute(
          new UpdateStatusCommand(indicator.id, Indicator.name, 'ERROR', e),
        );
      }
    }
  }
}
