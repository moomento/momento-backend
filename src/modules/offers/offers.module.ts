import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from '../../entities/offer.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  exports: [TypeOrmModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
