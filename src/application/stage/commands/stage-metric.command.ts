export class StageMetricCommand {
  constructor(
    public id: string,
    public facilityCode: number,
    public facilityName: string,
    public cargo: string,
    public cargoType: number,
    public facilityManifestId: string,
  ) {}
}
