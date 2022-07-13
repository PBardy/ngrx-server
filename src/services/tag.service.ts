import { CreateTagDto } from '@/dtos/tag/create-tag.dto';
import { PatchTagDto } from '@/dtos/tag/patch-tag.dto';
import { UpdateTagDto } from '@/dtos/tag/update-tag.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ITag } from '@/interfaces/tag.interface';
import { Tag } from '@/models/tag.model';
import { isEmpty } from 'class-validator';

export class TagService {
  public async getAll(): Promise<Array<ITag>> {
    return await Tag.query().select();
  }

  public async getOne(uuid: string): Promise<ITag> {
    const tag = await Tag.query().where('uuid', uuid).first();
    if (isEmpty(tag)) {
      throw new HttpException(404, 'Could not find tag');
    }

    return tag;
  }

  public async createOne(dto: CreateTagDto): Promise<ITag> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    return await Tag.query().insertAndFetch(dto);
  }

  public async updateOne(uuid: string, dto: UpdateTagDto): Promise<ITag> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    const tag = await Tag.query().where('uuid', uuid).first();
    if (isEmpty(tag)) {
      throw new HttpException(404, 'Could not find tag');
    }

    return await tag.$query().updateAndFetch(dto);
  }

  public async patchOne(uuid: string, dto: PatchTagDto): Promise<ITag> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid data');
    }

    const tag = await Tag.query().where('uuid', uuid).first();
    if (isEmpty(tag)) {
      throw new HttpException(404, 'Could not find tag');
    }

    return await tag.$query().patchAndFetch(dto);
  }

  public async deleteOne(uuid: string): Promise<ITag> {
    const tag = await Tag.query().where('uuid', uuid).first();
    if (isEmpty(tag)) {
      throw new HttpException(404, 'Could not find tag');
    }

    await tag.$query().delete();

    return tag;
  }

  public async upsertOne(dto: CreateTagDto | UpdateTagDto): Promise<ITag> {
    const tag = await Tag.query().where('name', dto.name).first();
    if (isEmpty(tag)) {
      return this.createOne(dto as CreateTagDto);
    }

    const updateDto = dto as UpdateTagDto;

    return this.updateOne(updateDto.uuid, updateDto);
  }

  public async upsertMany(dtos: Array<CreateTagDto | UpdateTagDto>): Promise<Array<ITag>> {
    return await Promise.all(dtos.map(dto => this.upsertOne(dto)));
  }
}
