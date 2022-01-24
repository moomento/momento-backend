import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
