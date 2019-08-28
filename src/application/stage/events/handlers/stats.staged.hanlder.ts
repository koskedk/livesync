import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ManifestStagedEvent } from '../manifest.staged.event';
import { StatsStagedEvent } from '../stats.staged.event';

@EventsHandler(StatsStagedEvent)
export class StatsStagedHanlder implements IEventHandler<StatsStagedEvent> {
  handle(event: StatsStagedEvent): any {
    Logger.debug(`=== StatsStagedEvent ===:${event.id}`);
  }
}
