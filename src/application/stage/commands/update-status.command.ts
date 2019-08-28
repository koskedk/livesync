export class UpdateStatusCommand {
  constructor(
    public id: string,
    public asset: string,
    public status: string,
    public statusInfo?: string,
  ) {}
}
