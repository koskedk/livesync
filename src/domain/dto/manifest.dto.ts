export interface ManifestDto {
  id?: string;
  fcilityCode?: number;
  facilityName?: string;
  docket?: string;
  logDate?: Date;
  buildDate?: Date;
  patientCount?: number;
  cargo?: any;
  isCurrent?: boolean;
}
