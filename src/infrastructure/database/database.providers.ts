import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    // @ts-ignore
    useFactory: async (configService: ConfigService) => ({
      type: configService.DatabaseType,
      host: configService.DatabaseHost,
      port: configService.DatabasePort,
      username: configService.DatabaseUser,
      password: configService.DatabasePass,
      database: configService.DatabaseName,
      entities: [configService.DatabaseEntities],
      synchronize: configService.DatabaseSync,
    }),
    inject: [ConfigService],
  }),
];
