import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manifest, Stats } from '../../domain';
import { StageManifestHandler } from './commands/handlers/stage-manifest.handler';
import { StageStatsHandler } from './commands/handlers/stage-stats.handler';
import { StagesController } from './controllers/stagesController';
import { SyncHandler } from './commands/handlers/sync.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Manifest, Stats])],
  providers: [StageManifestHandler, StageStatsHandler, SyncHandler],
  controllers: [StagesController],
})
export class StageModule {}
