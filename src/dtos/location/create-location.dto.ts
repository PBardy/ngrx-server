import { IsOptional, IsString } from 'class-validator';

interface ICreateLocationDto {
  name: string;
  description?: string | null;
}

export class CreateLocationDto implements ICreateLocationDto {
  @IsString()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly description: string | null;

  public constructor(location: ICreateLocationDto) {
    this.name = location.name;
    this.description = location.description;
  }
}
