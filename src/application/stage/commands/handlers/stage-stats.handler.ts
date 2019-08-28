import { StageManifestCommand } from '../stage-manifest.command';
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { StageStatsCommand } from '../stage-stats.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Manifest, Stats } from '../../../../domain';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';
import { StatsDto } from '../../../../domain/dto/stats.dto';

@CommandHandler(StageStatsCommand)
export class StageStatsHandler implements ICommandHandler<StageStatsCommand> {
  constructor(
    @InjectRepository(Stats)
    private readonly repository: Repository<Stats>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: StageStatsCommand): Promise<any> {
    const stats = new Stats();
    stats.facilityCode = command.facilityCode;
    stats.docket = JSON.stringify(command.docket);
    stats.stats = JSON.stringify(command.stats);
    stats.updated = command.updated;
    stats.initialize();
    const saved = await this.repository.save(stats);
    Logger.log(`Stats saved: ${saved.facilityCode} - ${saved.stats}`);

    this.publisher.mergeObjectContext(stats).commit();
    return saved;

    Logger.error('Failed to read stats');
  }
}
