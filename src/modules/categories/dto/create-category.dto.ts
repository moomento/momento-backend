import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  scopeId: number;

  @IsNumber()
  regionId?: number;
}
