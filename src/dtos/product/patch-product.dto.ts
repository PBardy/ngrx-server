import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PatchProductDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public code: string;

  @IsOptional()
  @IsNumber()
  public price: number;
}
