import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, Repository } from 'typeorm';
import { CreateScopeDto } from './dto/create-scope.dto';
import { SearchScopeDto } from './dto/search-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { Scope } from './entities/scope.entity';

@Injectable()
export class ScopesService {
  constructor(
    @InjectRepository(Scope)
    private scopesRepository: Repository<Scope>,
  ) {}

  async create(data: CreateScopeDto): Promise<Scope> {
    const scope = this.scopesRepository.create(data);
    await this.scopesRepository.save(data);
    return scope;
  }

  async paginate(data: SearchScopeDto) {
    const { take, skip } = data;
    const options = {
      order: {
        createdAt: 'DESC',
      },
      take,
      skip,
    } as FindManyOptions<Scope>;
    return await this.scopesRepository.findAndCount(options);
  }

  findOne(id: number): Promise<Scope> {
    return this.scopesRepository.findOne(id);
  }

  async update(id: number, data: UpdateScopeDto) {
    await this.scopesRepository.update({ id }, data);
    return await this.scopesRepository.findOne({ id });
  }

  async remove(id: number) {
    const result = await this.scopesRepository.softDelete(id);
    return result.affected > 0;
  }

  async destroy(id: number) {
    const result = await this.scopesRepository.delete(id);
    return result.affected > 0;
  }
}
