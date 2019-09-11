export class ManifestDto {
  id?: string;
  facilityCode?: number;
  facilityName?: string;
  docket?: string;
  logDate?: Date;
  buildDate?: Date;
  patientCount?: number;
  cargo?: any;
  isCurrent?: boolean;
}
