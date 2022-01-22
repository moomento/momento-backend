import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';

import { ObjectLiteral, Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionsService extends PaginationService {
  constructor(
    @InjectRepository(Region)
    private repository: Repository<Region>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateRegionDto): Promise<Region> {
    const region = this.repository.create(data);
    await this.repository.save(data);
    return region;
  }

  findOne(id: number): Promise<Region> {
    return this.repository.findOne(id);
  }

  async update(id: number, data: UpdateRegionDto) {
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
