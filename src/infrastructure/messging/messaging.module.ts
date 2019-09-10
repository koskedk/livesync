import { Module } from '@nestjs/common';
import { messagingProviders } from './messaging.providers';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [...messagingProviders, ConfigModule],
  exports: [...messagingProviders],
})
export class MessagingModule {}
