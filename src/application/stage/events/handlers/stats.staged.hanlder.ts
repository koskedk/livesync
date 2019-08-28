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
import { GetManifestQuery, GetStatsQuery } from '../../..';
import { Manifest, Stats } from '../../../../domain';
import { UpdateStatusCommand } from '../../commands/update-status.command';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(StatsStagedEvent)
export class StatsStagedHanlder implements IEventHandler<StatsStagedEvent> {
  constructor(
    @Inject('STATS_SERVICE')
    private readonly client: ClientProxy,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: StatsStagedEvent) {
    Logger.debug(`=== StatsStagedEvent ===:${event.id}`);

    const statsz = await this.queryBus.execute<GetStatsQuery, Stats[]>(
      new GetManifestQuery({ id: event.id }),
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
