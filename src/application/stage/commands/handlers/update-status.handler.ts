import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Manifest, Stats } from '../../../../domain';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';
import { UpdateStatusCommand } from '../update-status.command';

@CommandHandler(UpdateStatusCommand)
export class UpdateStatusHandler
  implements ICommandHandler<UpdateStatusCommand> {
  constructor(
    @InjectRepository(Manifest)
    private readonly manifestRepository: Repository<Manifest>,
    @InjectRepository(Stats)
    private readonly statsRepository: Repository<Stats>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateStatusCommand): Promise<any> {
    if (command.asset === Manifest.name) {
      const result = await this.updateManifestStatus(command);
      if (result) {
        Logger.log(`${result.facilityCode} - ${result.facilityName}  SENT >>>`);
      } else {
        Logger.error(`Manifest ${command.id} NOT SENT`);
      }
    }

    if (command.asset === Stats.name) {
      const result = await this.updateStatsStatus(command);
      if (result) {
        Logger.log(`${result.facilityCode} STATS SENT >>>`);
      } else {
        Logger.error(`STATS ${command.id} NOT SENT`);
      }
    }
  }

  async updateManifestStatus(command: UpdateStatusCommand): Promise<Manifest> {
    const existingManifest = await this.manifestRepository.findOne(command.id);

    if (existingManifest) {
      if (command.status === 'SENT') {
        existingManifest.markAsSent();
      }
      if (command.status === 'ERROR') {
        existingManifest.markAsFailed(command.statusInfo);
      }
      return await this.manifestRepository.save(existingManifest);
    }
  }

  async updateStatsStatus(command: UpdateStatusCommand): Promise<Stats> {
    const existingStats = await this.statsRepository.findOne(command.id);

    if (existingStats) {
      if (command.status === 'SENT') {
        existingStats.markAsSent();
      }
      if (command.status === 'ERROR') {
        existingStats.markAsFailed(command.statusInfo);
      }
      return await this.statsRepository.save(existingStats);
    }
  }
}
