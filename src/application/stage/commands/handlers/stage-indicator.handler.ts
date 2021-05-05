import { StageIndicatorCommand } from '../stage-indicator.command';
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
import { Indicator } from '../../../../domain/indicator.entity';

@CommandHandler(StageIndicatorCommand)
export class StageIndicatorHandler implements ICommandHandler<StageIndicatorCommand> {
  constructor(
    @InjectRepository(Indicator)
    private readonly repository: Repository<Indicator>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: StageIndicatorCommand): Promise<any> {
    let posted: any[] = [];
    for (const m of command.indicators) {
      const indicator = plainToClass(Indicator, m);
      if (indicator) {
        const existing = await this.repository.findOne(indicator.id);
        if (!existing) {
          indicator.initialize();
          const saved = await this.repository.save(indicator);
          Logger.log(
            `Indicator logged: ${saved.facilityCode} - ${saved.facilityName}`,
          );
          this.publisher.mergeObjectContext(indicator).commit();
          posted.push(saved);
        } else {
          Logger.log(
            `Indicator already exists ${existing.facilityCode} - ${existing.facilityName}`,
          );
          posted.push(existing);
          continue;
        }
      }
      // Logger.error('Failed to read indicator');
    }
    return posted;
  }
}
