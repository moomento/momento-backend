import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EventStatus } from '../../../entities/event.entity';
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

  @IsEnum(EventStatus)
  status: EventStatus;

  @IsNumber()
  homeTeamId?: number;

  @IsNumber()
  awayTeamId?: number;
}
