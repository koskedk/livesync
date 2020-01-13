import { MetricDto } from '../../../domain/dto/metric.dto';

export class StageMetricCommand {
  constructor(public metrics: MetricDto[]) {}
}
