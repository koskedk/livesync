import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import { StageModule } from '../../stage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageManifestHandler } from './stage-manifest.handler';
import { StageManifestCommand } from '../stage-manifest.command';
import { Manifest, Stats } from '../../../../domain';
import { getTestManifests, getTestStats } from '../../../../../test/test.data';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';
import { StageStatsCommand } from '../stage-stats.command';
import { StageStatsHandler } from './stage-stats.handler';

describe('Stage Stats Tests', () => {
  jest.setTimeout(30000);
  let module: TestingModule;
  let commandBus: CommandBus;
  let handler: StageStatsHandler;
  const data = getTestStats()[0];

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [Manifest, Stats],
            dropSchema: true,
            synchronize: true,
          }),
        }),
        StageModule,
      ],
    }).compile();

    //SEED
    handler = module.get<StageStatsHandler>(StageStatsHandler);
    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(handler, StageStatsCommand.name);
  });

  it('should Stage Stats', async () => {
    const command = plainToClass(StageStatsCommand, data);
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.log(result.stats);
  });
});
