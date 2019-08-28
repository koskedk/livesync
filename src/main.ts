import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  Logger.log(`starting in ${process.env.NODE_ENV} mode`);
  const microservice = app.connectMicroservice(config.QueueConfig);
  app.enableCors();
  await app.listen(config.Port);
  await app.startAllMicroservicesAsync().catch(e => Logger.error(e));
}
bootstrap();
