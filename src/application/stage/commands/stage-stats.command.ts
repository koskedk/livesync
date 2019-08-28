import { DocketDto } from '../../../domain/dto/docket.dto';
import { SummaryDto } from '../../../domain/dto/summary.dto';

export class StageStatsCommand {
  constructor(
    public facilityCode: number,
    public docket: DocketDto,
    public stats: SummaryDto[],
    public updated?: Date,
    public manifestId?: string,
  ) {}
}
