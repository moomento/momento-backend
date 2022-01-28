import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { Bid } from '../../entities/bid.entity';
import { PaginationService } from '../../pagination/pagination.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Injectable()
export class BidsService extends PaginationService {
  constructor(
    @InjectRepository(Bid)
    private repository: Repository<Bid>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateBidDto): Promise<Bid> {
    const bidData = this.repository.create(data);
    const bid = await this.repository.save(bidData);
    return bid;
  }

  findOne(id: number): Promise<Bid> {
    return this.repository.findOne(id);
  }

  async update(id: number, data: UpdateBidDto): Promise<Bid> {
    await this.repository.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.repository.softDelete(id);
    return result.affected > 0;
  }

  async destroy(id: number) {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
