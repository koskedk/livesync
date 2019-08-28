import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from '../../../../domain';
import { Repository } from 'typeorm';
import { GetStatsQuery } from '../get-stats-query';

@QueryHandler(GetStatsQuery)
export class GetStatsHandler implements IQueryHandler<GetStatsQuery, any> {
  constructor(
    @InjectRepository(Stats)
    private readonly repository: Repository<Stats>,
  ) {}

  execute(query: GetStatsQuery): Promise<any> {
    return undefined;
  }
}
