import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import { StageModule } from '../../stage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageMetricHandler } from './stage-metric.handler';
import { StageMetricCommand } from '../stage-metric.command';
import { getTestMetrics } from '../../../../../test/test.data';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';
import { Metric } from '../../../../domain/metric.entity';
import { Stats } from '../../../../domain/stats.entity';
import { Manifest } from '../../../../domain/manifest.entity';

describe('Stage Metric Tests', () => {
  jest.setTimeout(30000);
  let module: TestingModule;
  let commandBus: CommandBus;
  let handler: StageMetricHandler;
  const data = getTestMetrics();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [Manifest, Metric, Stats],
            dropSchema: true,
            synchronize: true,
          }),
        }),
        StageModule,
      ],
    }).compile();

    //SEED
    handler = module.get<StageMetricHandler>(StageMetricHandler);
    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(handler, StageMetricCommand.name);
  });

  it('should Stage Metric', async () => {
    const command = new StageMetricCommand(data);
    const result = await commandBus.execute(command);
    expect(result.length).toBeGreaterThan(0);
    // Logger.log(result.name);
  });
});
