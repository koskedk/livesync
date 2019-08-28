import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetManifestQuery } from '../get-manifest-query';
import { InjectRepository } from '@nestjs/typeorm';
import { Manifest } from '../../../../domain';
import { Repository } from 'typeorm';

@QueryHandler(GetManifestQuery)
export class GetManifestHandler
  implements IQueryHandler<GetManifestQuery, any> {
  constructor(
    @InjectRepository(Manifest)
    private readonly repository: Repository<Manifest>,
  ) {}

  async execute(query: GetManifestQuery): Promise<any[]> {
    if (query.criteria) return await this.repository.find(query.criteria);

    return await this.repository.find();
  }
}
