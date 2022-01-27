import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { ItemAttributeDisplayEnum } from '../../../constants/enums';

export class ItemAttributeDto {
  @IsEnum(ItemAttributeDisplayEnum)
  displayType?: ItemAttributeDisplayEnum;

  @IsString()
  traitType?: string;

  @IsString()
  value?: string;

  @IsNumber()
  itemId?: number;

  @IsNumber()
  rank?: number;

  @IsNumber()
  id?: number;

  @IsBoolean()
  deleted?: boolean;
}

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  image?: string;

  @IsUrl()
  externalUrl?: string;

  @IsString()
  description: string;

  @IsHexColor()
  backgroundColor?: string;

  @IsUrl()
  animationUrl?: string;

  @IsUrl()
  youtubeUrl?: string;

  @IsNumber()
  eventId: number;

  @IsArray()
  collectionIds: number[];

  @IsArray()
  attributes: ItemAttributeDto[];

  @IsNumber()
  creatorId: number;

  @IsNumber()
  ownerId: number;
}
