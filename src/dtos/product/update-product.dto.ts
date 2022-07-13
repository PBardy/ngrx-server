import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  public id: number;

  @IsUUID()
  public uuid: string;

  @IsString()
  public slug: string;

  @IsString()
  public name: string;

  @IsString()
  public code: string;

  @IsNumber()
  public price: number;
}
