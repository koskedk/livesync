import { StageManifestCommand } from '../stage-manifest.command';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Manifest } from '../../../../domain';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';

@CommandHandler(StageManifestCommand)
export class StageManifestHandler
  implements ICommandHandler<StageManifestCommand> {
  constructor(
    @InjectRepository(Manifest)
    private readonly repository: Repository<Manifest>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: StageManifestCommand): Promise<any> {
    const manifest = plainToClass(Manifest, command);
    if (manifest) {
      const existing = await this.repository.findOne(manifest.id);
      if (existing) {
        Logger.log(
          `Manifest already exists ${existing.facilityCode} - ${existing.facilityName}`,
        );
        return existing;
      }
      manifest.initialize();
      const saved = await this.repository.save(manifest);
      Logger.log(
        `Manifest logged: ${saved.facilityCode} - ${saved.facilityName}`,
      );
      return saved;
    }
    Logger.error('Failed to read manifest');
  }
}
