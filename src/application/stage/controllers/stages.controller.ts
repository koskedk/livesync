import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { StatsDto } from '../../../domain/dto/stats.dto';
import { ManifestDto } from '../../../domain/dto/manifest.dto';
import { DocketDto } from '../../../domain/dto/docket.dto';
import { SummaryDto } from '../../../domain/dto/summary.dto';
import { StageManifestCommand } from '../commands/stage-manifest.command';
import { StageStatsCommand } from '../commands/stage-stats.command';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('stages')
export class StagesController {
  constructor(
    @Inject('STATS_SERVICE')
    private readonly client: ClientProxy,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('manifest')
  async logManifest(@Body() manifest: any) {
    return this.commandBus.execute(
      new StageManifestCommand(
        manifest.id,
        manifest.facilityCode,
        manifest.facilityName,
        manifest.docket,
        manifest.logDate,
        manifest.buildDate,
        manifest.patientCount,
        manifest.cargo,
      ),
    );
  }

  @Post('stats')
  async postStats(@Body() statsDto: StatsDto) {
    return this.commandBus.execute(
      new StageStatsCommand(
        statsDto.facilityCode,
        statsDto.docket,
        statsDto.stats,
        statsDto.updated,
        statsDto.manifestId,
      ),
    );
  }

  @EventPattern('LogManifestEvent_ack')
  ackMessageTestData(data: any) {
    console.log(data.toString());
    return 'Message Received';
  }
}
