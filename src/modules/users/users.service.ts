import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';

import { ObjectLiteral, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends PaginationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.usersRepository;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user;
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, data: UpdateUserDto) {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async remove(id: number) {
    const result = await this.usersRepository.softDelete(id);
    return result.affected > 0;
  }

  async destroy(id: number) {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0;
  }
}
