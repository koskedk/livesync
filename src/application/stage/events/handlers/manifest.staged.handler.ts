import { EventsHandler, IEvent, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ManifestStagedEvent } from '../manifest.staged.event';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(ManifestStagedEvent)
export class ManifestStagedHandler
  implements IEventHandler<ManifestStagedEvent> {
  constructor(
    @Inject('STATS_SERVICE')
    private readonly client: ClientProxy,
    private readonly queryBus: QueryBus,
  ) {}

  handle(event: ManifestStagedEvent): any {
    Logger.debug(`=== ManifestStagedEvent ===:${event.id}`);
  }
}
