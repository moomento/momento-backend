import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';

import { ObjectLiteral, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '../../entities/item.entity';
import { Collection } from '../../entities/collection.entity';
import { ItemAttribute } from '../../entities/item-attribute.entity';

@Injectable()
export class ItemsService extends PaginationService {
  constructor(
    @InjectRepository(Item)
    private repository: Repository<Item>,

    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,

    @InjectRepository(ItemAttribute)
    private attributeRepository: Repository<ItemAttribute>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateItemDto): Promise<Item> {
    const { collectionIds, attributes: attributesDto, ...rest } = data;
    const collections = await this.collectionRepository.findByIds(
      collectionIds,
    );
    const itemData = {
      ...rest,
      collections,
    };
    const ret = this.repository.create(itemData);
    const item = await this.repository.save(ret);

    await Promise.all(
      attributesDto.map(async (attribute, index) => {
        attribute.itemId = item.id;
        attribute.rank = index + 1;
        const data = this.attributeRepository.create(attribute);
        return await this.attributeRepository.save(data);
      }),
    );
    const itemRet = await this.repository.findOne(item.id, {
      relations: ['collections', 'attributes'],
    });
    console.log(itemRet);
    return itemRet;
  }

  findOne(id: number): Promise<Item> {
    return this.repository.findOne(id);
  }

  async update(id: number, data: UpdateItemDto) {
    const { collectionIds, attributes: attributesDto, ...rest } = data;
    const collections = await this.collectionRepository.findByIds(
      collectionIds,
    );
    const itemData = {
      ...rest,
    };
    const ret = this.repository.create(itemData);
    await this.repository.update(id, ret);
    await Promise.all(
      attributesDto.map(async (attributeDto) => {
        if (attributeDto.id) {
          if (attributeDto.deleted) {
            return await this.attributeRepository.delete(attributeDto.id);
          }
          const { id, ...rest } = attributeDto;
          return await this.attributeRepository.update(id, rest);
        }
        attributeDto.itemId = id;
        const attribute = this.attributeRepository.create(attributeDto);
        return await this.attributeRepository.save(attribute);
      }),
    );
    const itemRet = await this.repository.findOne(id, {
      relations: ['collections', 'attributes'],
    });
    itemRet.collections = collections;
    this.repository.save(itemRet, { reload: true });
    console.log('update', itemRet);
    return itemRet;
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
