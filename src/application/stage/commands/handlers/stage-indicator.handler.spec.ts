import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import { StageModule } from '../../stage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageIndicatorHandler } from './stage-indicator.handler';
import { StageIndicatorCommand } from '../stage-indicator.command';
import { getTestIndicators } from '../../../../../test/test.data';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';
import { Indicator } from '../../../../domain/indicator.entity';
import { Stats } from '../../../../domain/stats.entity';
import { Manifest } from '../../../../domain/manifest.entity';

describe('Stage Indicator Tests', () => {
  jest.setTimeout(30000);
  let module: TestingModule;
  let commandBus: CommandBus;
  let handler: StageIndicatorHandler;
  const data = getTestIndicators();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [Manifest, Indicator, Stats],
            dropSchema: true,
            synchronize: true,
          }),
        }),
        StageModule,
      ],
    }).compile();

    //SEED
    handler = module.get<StageIndicatorHandler>(StageIndicatorHandler);
    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(handler, StageIndicatorCommand.name);
  });

  it('should Stage Indicator', async () => {
    const command = new StageIndicatorCommand(data);
    const result = await commandBus.execute(command);
    expect(result.length).toBeGreaterThan(0);
    // Logger.log(result.name);
  });
});
