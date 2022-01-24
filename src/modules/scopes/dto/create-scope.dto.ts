import { IsNotEmpty, IsString } from 'class-validator';
export class CreateScopeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  content?: string;
}
