import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EventStatusEnum } from '../../../constants/enums';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  categoryId?: number;

  @IsDate()
  startAt: Date;

  @IsNumber()
  duration: number;

  @IsDate()
  endAt?: Date;

  @IsEnum(EventStatusEnum)
  status: EventStatusEnum;

  @IsNumber()
  homeTeamId?: number;

  @IsNumber()
  awayTeamId?: number;
}
