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
} from '@nestjs/common';
import { Response as Res } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(@Body() data: CreateCollectionDto) {
    return this.collectionsService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.collectionsService.paginate(data);
    return res.json({ data: list, total: count });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCollectionDto) {
    return this.collectionsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id);
  }
}
