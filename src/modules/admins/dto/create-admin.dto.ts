import { IsNotEmpty, IsString } from 'class-validator';
import { Unique } from '../../../validations/unique.validation';
import { Match } from '../../../validations/match.validation';
import { Admin } from '../../../entities/admin.entity';
export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Unique({ entity: Admin })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Match('password')
  confirmPassword?: string;
}
