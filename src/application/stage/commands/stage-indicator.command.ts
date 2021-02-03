import { IndicatorDto } from '../../../domain/dto/indicator.dto';

export class StageIndicatorCommand {
  constructor(public indicators: IndicatorDto[]) {}
}
