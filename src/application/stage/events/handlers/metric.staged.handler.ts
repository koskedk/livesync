import {
  CommandBus,
  EventsHandler,
  IEventHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { MetricStagedEvent } from '../metric.staged.event';
import { UpdateStatusCommand } from '../../commands/update-status.command';
import { GetMetricQuery } from '../../queries/get-metric-query';
import { Metric } from '../../../../domain/metric.entity';
import { MessagingService } from '../../../../infrastructure/messging/messaging.service';
import { ConfigService } from '../../../../config/config.service';

@EventsHandler(MetricStagedEvent)
export class MetricStagedHandler implements IEventHandler<MetricStagedEvent> {
  constructor(
    private readonly config: ConfigService,
    private readonly client: MessagingService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: MetricStagedEvent) {
    let metrics = [];
    Logger.debug(`=== Publishing MetricStagedEvent ===:${event.id}`);

    metrics = await this.queryBus.execute<GetMetricQuery, Metric[]>(
      new GetMetricQuery({ id: event.id }),
    );

    for (const metric of metrics) {
      try {
        const result = await this.client.publish(
          JSON.stringify(metric),
          this.config.QueueStatsExchange,
          this.config.getRoute(Metric.name.toLowerCase()),
        );

        if (result) {
          await this.commandBus.execute(
            new UpdateStatusCommand(metric.id, Metric.name, 'SENT'),
          );
        } else {
          await this.commandBus.execute(
            new UpdateStatusCommand(
              metric.id,
              Metric.name,
              'ERROR',
              'Unkown Publish Error',
            ),
          );
        }
      } catch (e) {
        Logger.error(`PUBLISH`, e);
        await this.commandBus.execute(
          new UpdateStatusCommand(metric.id, Metric.name, 'ERROR', e),
        );
      }
    }
  }
}
