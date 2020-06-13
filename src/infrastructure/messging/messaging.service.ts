import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { ConfigService } from '../../config/config.service';
import { CommandBus } from '@nestjs/cqrs';
import { SyncCommand } from '../../application/stage/commands/sync.command';
import { Manifest } from '../../domain/manifest.entity';
import { ManifestDto } from '../../domain/dto/manifest.dto';

@Injectable()
export class MessagingService {
  constructor(
    private readonly config: ConfigService,
    private readonly amqpConnection: AmqpConnection,
    private readonly commandBus: CommandBus,
  ) {}

  public async publish(
    message: any,
    exchange: string,
    route: string,
  ): Promise<boolean> {
    try {
      await this.amqpConnection.publish(exchange, route, message);
      return true;
    } catch (e) {
      return false;
    }
  }

  @RabbitSubscribe({
    exchange: 'stats.exchange',
    routingKey: 'syncstats.route',
    queue: 'syncstats.queue',
  })
  public async subscribeToGlobe(data: any) {
    const message = JSON.parse(data);
    Logger.log(`+++++++++++ ${message.label} +++++++++`);
    Logger.log(`request ${message.body.docket} ${message.body.code}`);

    if (message.body) {
      const manifest: ManifestDto = {
        id: message.body.id,
        facilityCode: message.body.code,
        docket: message.body.docket,
      };

      await this.commandBus.execute(new SyncCommand(manifest));
    }
  }
}
