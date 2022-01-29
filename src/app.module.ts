import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AdminsModule } from './modules/admins/admins.module';
import { AuthAdminsModule } from './modules/auth/auth-admins.module';
import { BidsModule } from './modules/bids/bids.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { EventsModule } from './modules/events/events.module';
import { ItemAttributesModule } from './modules/item-attributes/item-attributes.module';
import { ItemsModule } from './modules/items/items.module';
import { OffersModule } from './modules/offers/offers.module';
import { RegionsModule } from './modules/regions/regions.module';
import { ScopesModule } from './modules/scopes/scopes.module';
import { TeamsModule } from './modules/teams/teams.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),
    ScopesModule,
    CategoriesModule,
    RegionsModule,
    TeamsModule,
    EventsModule,
    CollectionsModule,
    ItemsModule,
    ItemAttributesModule,
    UsersModule,
    OffersModule,
    BidsModule,
    AdminsModule,
    AuthAdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
