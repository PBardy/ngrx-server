import { ITag } from '@/interfaces/tag.interface';
import { IsString, IsUUID } from 'class-validator';

export class TagDto {
  @IsUUID()
  public readonly uuid: string;

  @IsString()
  public readonly name: string;

  public constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }

  public static fromModel({ uuid, name }: ITag): TagDto {
    return new TagDto(uuid, name);
  }

  public static fromModels(models: Array<ITag>): Array<TagDto> {
    return models.map(TagDto.fromModel);
  }
}
