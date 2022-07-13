import { IsOptional, IsString } from 'class-validator';

export class PatchTagDto {
  @IsOptional()
  @IsString()
  public readonly name: string;
}
