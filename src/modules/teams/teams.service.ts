import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationService } from '../../pagination/pagination.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService extends PaginationService {
  constructor(
    @InjectRepository(Team)
    private repository: Repository<Team>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateTeamDto): Promise<Team> {
    const team = this.repository.create(data);
    await this.repository.save(team);
    return team;
  }

  findOne(id: number): Promise<Team> {
    return this.repository.findOne(id, {
      relations: ['category', 'category.scope', 'category.region'],
    });
  }

  async update(id: number, dto: UpdateTeamDto) {
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
