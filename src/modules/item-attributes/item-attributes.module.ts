import { Module } from '@nestjs/common';
import { ItemAttributesService } from './item-attributes.service';
import { ItemAttributesController } from './item-attributes.controller';

@Module({
  controllers: [ItemAttributesController],
  providers: [ItemAttributesService]
})
export class ItemAttributesModule {}
