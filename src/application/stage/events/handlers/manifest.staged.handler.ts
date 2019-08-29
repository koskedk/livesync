import {
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
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: ManifestStagedEvent) {
    Logger.debug(`=== ManifestStagedEvent ===:${event.id}`);

    const manifests = await this.queryBus.execute<GetManifestQuery, Manifest[]>(
      new GetManifestQuery({ id: event.id }),
    );

    manifests.forEach(manifest => {
      this.client.emit('LogManifestEvent', JSON.stringify(manifest)).subscribe(
        m => {
          Logger.log(m);
          Logger.log('PUBLISHED');
          this.eventBus.publish(
            new UpdateStatusCommand(manifest.id, Manifest.name, 'SENT'),
          );
        },
        w => {
          Logger.error(w);
          this.eventBus.publish(
            new UpdateStatusCommand(manifest.id, Manifest.name, 'ERROR', w),
          );
        },
        () => {
          Logger.log('DONE');
        },
      );
    });
  }
}
