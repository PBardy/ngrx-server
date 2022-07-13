import { IsString, IsUUID } from 'class-validator';

export class UpdateTagDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly name: string;
}
