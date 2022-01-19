import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ScopeModule } from './modules/scope/scope.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('database'));
        return configService.get('database');
      },
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),
    ScopeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
