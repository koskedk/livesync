import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manifest, Stats } from '../../domain';
import { StageManifestHandler } from './commands/handlers/stage-manifest.handler';
import { StageStatsHandler } from './commands/handlers/stage-stats.handler';
import { SyncHandler } from './commands/handlers/sync.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { StagesController } from './controllers/stages.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Manifest, Stats])],
  providers: [StageManifestHandler, StageStatsHandler, SyncHandler],
  controllers: [StagesController],
})
export class StageModule {}
