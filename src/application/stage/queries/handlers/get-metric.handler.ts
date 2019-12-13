import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMetricQuery } from '../get-metric-query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from '../../../../domain/metric.entity';

@QueryHandler(GetMetricQuery)
export class GetMetricHandler implements IQueryHandler<GetMetricQuery, any> {
  constructor(
    @InjectRepository(Metric)
    private readonly repository: Repository<Metric>,
  ) {}

  async execute(query: GetMetricQuery): Promise<any[]> {
    if (query.criteria) return await this.repository.find(query.criteria);

    return await this.repository.find();
  }
}
