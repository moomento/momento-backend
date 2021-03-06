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
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionsService } from './regions.service';

@Controller('regions')
@UseGuards(new AuthAdminGuard())
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  create(@Body() data: CreateRegionDto) {
    return this.regionsService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.regionsService.paginate(data);
    return res.json({ data: list, total: count });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateRegionDto) {
    return this.regionsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
