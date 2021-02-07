export class StageHandshakeCommand {
  constructor(
    public id: string,
    public session?: string,
    public start?: Date,
    public end?: Date,
    public tag?: string,
  ) {}
}
