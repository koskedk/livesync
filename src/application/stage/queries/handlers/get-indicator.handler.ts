import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIndicatorQuery } from '../get-indicator-query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicator } from '../../../../domain/indicator.entity';

@QueryHandler(GetIndicatorQuery)
export class GetIndicatorHandler implements IQueryHandler<GetIndicatorQuery, any> {
  constructor(
    @InjectRepository(Indicator)
    private readonly repository: Repository<Indicator>,
  ) {}

  async execute(query: GetIndicatorQuery): Promise<any[]> {
    if (query.criteria) return await this.repository.find(query.criteria);

    return await this.repository.find();
  }
}
