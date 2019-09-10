import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [...databaseProviders, ConfigModule],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
