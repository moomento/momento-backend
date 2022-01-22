import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';
import { PaginationDto } from './pagination.dto';

export abstract class PaginationService {
  abstract getRepository(): Repository<ObjectLiteral>;

  parseSort(sort: string, order: string) {
    return null;
  }

  parseParams(params: any) {
    return null;
  }

  async paginate(data: PaginationDto) {
    const { take, skip, order, sort, ...params } = data;
    const repository = this.getRepository();
    const options = {
      take,
      skip,
    } as FindManyOptions<ObjectLiteral>;
    return await repository.findAndCount(options);
  }
}
