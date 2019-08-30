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
import { ClientProxy } from '@nestjs/microservices';
import { UpdateStatusCommand } from '../../commands/update-status.command';
import { GetManifestQuery } from '../../queries/get-manifest-query';
import { Manifest } from '../../../../domain/manifest.entity';

@EventsHandler(ManifestStagedEvent)
export class ManifestStagedHandler
  implements IEventHandler<ManifestStagedEvent> {
  constructor(
    @Inject('STATS_SERVICE')
    private readonly client: ClientProxy,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: ManifestStagedEvent) {
    let manifests = [];
    Logger.debug(`=== ManifestStagedEvent ===:${event.id}`);

    manifests = await this.queryBus.execute<GetManifestQuery, Manifest[]>(
      new GetManifestQuery({ id: event.id }),
    );

    for (const manifest of manifests) {
      try {
        await this.client.emit('LogManifestEvent', manifest).toPromise();
        await this.client.emit('LogManifestEvent', manifest).toPromise();

        await this.commandBus.execute(
          new UpdateStatusCommand(manifest.id, Manifest.name, 'SENT'),
        );
      } catch (e) {
        Logger.error(`PUBLISH`, e);
        await this.commandBus.execute(
          new UpdateStatusCommand(manifest.id, Manifest.name, 'ERROR', e),
        );
      }
    }
  }
}
