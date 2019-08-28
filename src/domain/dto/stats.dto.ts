import { DocketDto } from './docket.dto';
import { SummaryDto } from './summary.dto';

export class StatsDto {
  facilityCode?: number;
  docket?: DocketDto;
  stats?: SummaryDto[];
  updated?: Date;
  manifestId?: string;
}
