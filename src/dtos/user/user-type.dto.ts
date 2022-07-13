import { IUserType, UserRole } from '@/interfaces/user-type.inteface';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserTypeDTO {
  @IsUUID()
  public uuid: string;

  @IsEnum(UserRole, { each: true })
  public tag: UserRole;

  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public description: string | null;

  @IsOptional()
  @IsString()
  public icon: string | null;

  public static fromModel(model: IUserType): UserTypeDTO {
    const dto = new UserTypeDTO();
    dto.uuid = model.uuid;
    dto.tag = model.tag;
    dto.name = model.name;
    dto.description = model.description;
    dto.icon = model.icon;

    return dto;
  }

  public static fromModels(models: Array<IUserType>): Array<UserTypeDTO> {
    return models.map(UserTypeDTO.fromModel);
  }
}
