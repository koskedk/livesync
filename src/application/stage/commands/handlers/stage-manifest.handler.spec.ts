import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';
import { StageModule } from '../../stage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageManifestHandler } from './stage-manifest.handler';
import { StageManifestCommand } from '../stage-manifest.command';
import { Manifest, Stats } from '../../../../domain';
import { getTestManifests } from '../../../../../test/test.data';
import { plainToClass } from 'class-transformer';
import { Logger } from '@nestjs/common';

describe('Stage Manifest Tests', () => {
  jest.setTimeout(30000);
  let module: TestingModule;
  let commandBus: CommandBus;
  let handler: StageManifestHandler;
  const data = getTestManifests()[0];

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
    handler = module.get<StageManifestHandler>(StageManifestHandler);
    commandBus = module.get<CommandBus>(CommandBus);
    commandBus.bind(handler, StageManifestCommand.name);
  });

  it('should Stage Manifest', async () => {
    const command = plainToClass(StageManifestCommand, data);
    const result = await commandBus.execute(command);
    expect(result).not.toBeNull();
    Logger.log(result.name);
  });
});
