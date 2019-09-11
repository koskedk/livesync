import {
  CommandBus,
  EventsHandler,
  IEventHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { StatsStagedEvent } from '../stats.staged.event';
import { UpdateStatusCommand } from '../../commands/update-status.command';

import { GetStatsQuery } from '../../queries/get-stats-query';
import { Stats } from '../../../../domain/stats.entity';

import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';
import { plainToClass } from 'class-transformer';
import { StatsDto } from '../../../../domain/dto/stats.dto';

@EventsHandler(StatsStagedEvent)
export class StatsStagedHanlder implements IEventHandler<StatsStagedEvent> {
  constructor(
    private readonly config: ConfigService,
    private readonly client: MessagingService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: StatsStagedEvent) {
    let statsz = [];
    Logger.debug(`=== StatsStagedEvent ===:${event.id}`);

    statsz = await this.queryBus.execute<GetStatsQuery, Stats[]>(
      new GetStatsQuery({ id: event.id }),
    );

    for (const stats of statsz) {
      try {
        stats.docket = JSON.parse(stats.docket);
        stats.stats = JSON.parse(stats.stats);
        const result = await this.client.publish(
          JSON.stringify(stats),
          this.config.QueueStatsExchange,
          this.config.getRoute(Stats.name.toLowerCase()),
        );
        Logger.log('PUBLISHED');

        if (result) {
          await this.commandBus.execute(
            new UpdateStatusCommand(stats.id, Stats.name, 'SENT'),
          );
        } else {
          await this.commandBus.execute(
            new UpdateStatusCommand(
              stats.id,
              Stats.name,
              'ERROR',
              'Unkown publish Error',
            ),
          );
        }
      } catch (e) {
        Logger.error(e);
        await this.commandBus.execute(
          new UpdateStatusCommand(stats.id, Stats.name, 'ERROR', e),
        );
      }
    }
  }
}
