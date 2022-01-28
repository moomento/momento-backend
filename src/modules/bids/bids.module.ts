import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from '../../entities/bid.entity';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bid])],
  exports: [TypeOrmModule],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
