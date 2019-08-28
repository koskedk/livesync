import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SyncCommand } from '../sync.command';

@CommandHandler(SyncCommand)
export class SyncHandler implements ICommandHandler<SyncCommand> {
  constructor(private readonly eventBus: EventBus) {}

  execute(command: SyncCommand): Promise<any> {
    return undefined;
  }
}
