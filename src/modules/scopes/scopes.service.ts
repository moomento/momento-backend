import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';

import { ObjectLiteral, Repository } from 'typeorm';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { Scope } from './entities/scope.entity';

@Injectable()
export class ScopesService extends PaginationService {
  constructor(
    @InjectRepository(Scope)
    private scopesRepository: Repository<Scope>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.scopesRepository;
  }

  async create(data: CreateScopeDto): Promise<Scope> {
    const scope = this.scopesRepository.create(data);
    await this.scopesRepository.save(scope);
    return scope;
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
