import { HandshakeDto } from '../../../domain/dto/handshake.dto';

export class StageHandshakeCommand {
  constructor(handshakes: HandshakeDto[]) {
    this.handshakes = handshakes;
  }
  handshakes?: HandshakeDto[]
}
