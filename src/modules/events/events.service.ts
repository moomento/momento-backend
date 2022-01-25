import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationService } from '../../pagination/pagination.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '../../entities/event.entity';

@Injectable()
export class EventsService extends PaginationService {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateEventDto): Promise<Event> {
    const event = this.repository.create(data);
    await this.repository.save(event);
    return event;
  }

  findOne(id: number): Promise<Event> {
    return this.repository.findOne(id, {
      relations: ['scope', 'region', 'parent'],
    });
  }

  async update(id: number, dto: UpdateEventDto) {
    await this.repository.update({ id }, dto);
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
