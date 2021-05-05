import { ManifestDto } from '../../../domain/dto/manifest.dto';

export class SyncCommand {
  public constructor(public manifet: ManifestDto) {}
}
