import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemAttributesService } from './item-attributes.service';
import { CreateItemAttributeDto } from './dto/create-item-attribute.dto';
import { UpdateItemAttributeDto } from './dto/update-item-attribute.dto';

@Controller('item-attributes')
export class ItemAttributesController {
  constructor(private readonly itemAttributesService: ItemAttributesService) {}

  @Post()
  create(@Body() createItemAttributeDto: CreateItemAttributeDto) {
    return this.itemAttributesService.create(createItemAttributeDto);
  }

  @Get()
  findAll() {
    return this.itemAttributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemAttributesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemAttributeDto: UpdateItemAttributeDto) {
    return this.itemAttributesService.update(+id, updateItemAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemAttributesService.remove(+id);
  }
}
