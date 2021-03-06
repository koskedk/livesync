import { StageMetricCommand } from '../stage-metric.command';
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
import { Metric } from '../../../../domain/metric.entity';

@CommandHandler(StageMetricCommand)
export class StageMetricHandler implements ICommandHandler<StageMetricCommand> {
  constructor(
    @InjectRepository(Metric)
    private readonly repository: Repository<Metric>,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: StageMetricCommand): Promise<any> {
    let posted: any[] = [];
    for (const m of command.metrics) {
      const metric = plainToClass(Metric, m);
      if (metric) {
        const existing = await this.repository.findOne(metric.id);
        if (!existing) {
          metric.initialize();
          const saved = await this.repository.save(metric);
          Logger.log(
            `Metric logged: ${saved.facilityCode} - ${saved.facilityName}`,
          );
          this.publisher.mergeObjectContext(metric).commit();
          posted.push(saved);
        } else {
          Logger.log(
            `Metric already exists ${existing.facilityCode} - ${existing.facilityName}`,
          );
          posted.push(existing);
          continue;
        }
      }
      // Logger.error('Failed to read metric');
    }
    return posted;
  }
}
