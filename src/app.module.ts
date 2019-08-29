import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from './config/config.module';
import { CqrsModule } from '@nestjs/cqrs';
import { StageModule } from './application/stage/stage.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule, CqrsModule, StageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
