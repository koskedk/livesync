import {
  CommandBus,
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
        await this.client.emit('UpdateStatsEvent', stats).toPromise();
        await this.client.emit('UpdateStatsEvent', stats).toPromise();
        Logger.log('PUBLISHED');
        await this.commandBus.execute(
          new UpdateStatusCommand(stats.id, Stats.name, 'SENT'),
        );
      } catch (e) {
        Logger.error(e);
        this.commandBus.execute(
          new UpdateStatusCommand(stats.id, Stats.name, 'ERROR', e),
        );
      }
    }
  }
}
