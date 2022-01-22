import {
  Query,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { ScopesService } from './scopes.service';

import { Response as Res } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
@Controller('scopes')
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  @Post()
  create(@Body() data: CreateScopeDto) {
    return this.scopesService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.scopesService.paginate(data);
    return res.set({ 'x-total-count': count }).json(list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scopesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateScopeDto) {
    return this.scopesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scopesService.remove(+id);
  }
}
