import {
  EventBus,
  EventsHandler,
  IEvent,
  IEventHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ManifestStagedEvent } from '../manifest.staged.event';
import { StatsStagedEvent } from '../stats.staged.event';
import { UpdateStatusCommand } from '../../commands/update-status.command';
import { ClientProxy } from '@nestjs/microservices';
import { GetStatsQuery } from '../../queries/get-stats-query';
import { Stats } from '../../../../domain/stats.entity';
import { GetManifestQuery } from '../../queries/get-manifest-query';
import { Manifest } from '../../../../domain/manifest.entity';

@EventsHandler(StatsStagedEvent)
export class StatsStagedHanlder implements IEventHandler<StatsStagedEvent> {
  constructor(
    @Inject('STATS_SERVICE')
    private readonly client: ClientProxy,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: StatsStagedEvent) {
    let statsz = [];
    Logger.debug(`=== StatsStagedEvent ===:${event.id}`);

    statsz = await this.queryBus.execute<GetStatsQuery, Stats[]>(
      new GetStatsQuery({ id: event.id }),
    );

    statsz.forEach(stats => {
      this.client.emit('UpdateStatsEvent', JSON.stringify(stats)).subscribe(
        m => {
          Logger.log(m);
          Logger.log('PUBLISHED');
          this.eventBus.publish(
            new UpdateStatusCommand(stats.id, Manifest.name, 'SENT'),
          );
        },
        w => {
          Logger.error(w);
          this.eventBus.publish(
            new UpdateStatusCommand(stats.id, Manifest.name, 'ERROR', w),
          );
        },
        () => {
          Logger.log('DONE');
        },
      );
    });
  }
}
