import { IsNotEmpty, IsString } from 'class-validator';
export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  content?: string;
}
