import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Scope } from './entities/scope.entity';

@Injectable()
export class ScopeService extends TypeOrmCrudService<Scope> {
  constructor(@InjectRepository(Scope) repo) {
    super(repo);
  }
}
