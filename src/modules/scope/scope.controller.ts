import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScopeService } from './scope.service';
import { CreateScopeDto } from './dto/create-scope.dto';
import { UpdateScopeDto } from './dto/update-scope.dto';

@Controller('scope')
export class ScopeController {
  constructor(private readonly scopeService: ScopeService) {}

  @Post()
  create(@Body() createScopeDto: CreateScopeDto) {
    return this.scopeService.create(createScopeDto);
  }

  @Get()
  findAll() {
    return this.scopeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scopeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScopeDto: UpdateScopeDto) {
    return this.scopeService.update(+id, updateScopeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scopeService.remove(+id);
  }
}
