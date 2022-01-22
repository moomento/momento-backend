import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';
import { Repository, ObjectLiteral } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends PaginationService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = this.repository.create(data);
    await this.repository.save(data);
    return category;
  }

  findOne(id: number): Promise<Category> {
    return this.repository.findOne(id);
  }

  async update(id: number, data: UpdateCategoryDto) {
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
