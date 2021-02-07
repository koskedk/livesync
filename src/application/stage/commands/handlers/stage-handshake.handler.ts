import { StageManifestCommand } from '../stage-manifest.command';
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';
import { Manifest } from '../../../../domain/manifest.entity';
import { StageHandshakeCommand } from '../stage-handshake.command';

@CommandHandler(StageHandshakeCommand)
export class StageHandshakeHandler
  implements ICommandHandler<StageHandshakeCommand> {
  constructor(
    @InjectRepository(Manifest)
    private readonly repository: Repository<Manifest>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: StageHandshakeCommand): Promise<any> {
    Logger.log(
      `procssing Handshake logged: ${command.id}`,
    );
    const existing = await this.repository.findOne(command.id);
    if (existing) {
      let manifest=plainToClass(Manifest,existing)
      manifest.updateSession(command.end);
      await this.repository.save(manifest);
      Logger.log(
        `Handshake logged: ${manifest.facilityCode} - ${manifest.facilityName}`,
      );

      this.publisher.mergeObjectContext(manifest).commit();
      return manifest;
    }
    Logger.error('Failed to read manifest');
  }
}
