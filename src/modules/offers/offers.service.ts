import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { Offer } from '../../entities/offer.entity';
import { PaginationService } from '../../pagination/pagination.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService extends PaginationService {
  constructor(
    @InjectRepository(Offer)
    private repository: Repository<Offer>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateOfferDto): Promise<Offer> {
    const offerData = this.repository.create(data);
    const offer = await this.repository.save(offerData);
    return offer;
  }

  findOne(id: number): Promise<Offer> {
    return this.repository.findOne(id);
  }

  async update(id: number, data: UpdateOfferDto): Promise<Offer> {
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
