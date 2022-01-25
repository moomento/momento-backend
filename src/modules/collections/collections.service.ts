import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';

import { ObjectLiteral, Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from '../../entities/collection.entity';

@Injectable()
export class CollectionsService extends PaginationService {
  constructor(
    @InjectRepository(Collection)
    private repository: Repository<Collection>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateCollectionDto): Promise<Collection> {
    const collection = this.repository.create(data);
    await this.repository.save(collection);
    return collection;
  }

  findOne(id: number): Promise<Collection> {
    return this.repository.findOne(id);
  }

  async update(id: number, data: UpdateCollectionDto) {
    await this.repository.update({ id }, data);
    return await this.repository.findOne({ id });
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
