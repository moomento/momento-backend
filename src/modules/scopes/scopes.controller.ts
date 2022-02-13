import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
import { AuthAdminGuard } from '../auth/auth-admins.guard';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';
import { ScopesService } from './scopes.service';

@Controller('scopes')
@UseGuards(new AuthAdminGuard())
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  @Post()
  create(@Body() data: CreateScopeDto) {
    return this.scopesService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.scopesService.paginate(data);
    return res.json({
      data: list,
      total: count,
    });
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
