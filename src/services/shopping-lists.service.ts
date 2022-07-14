import { CreateShoppingListDto } from '@/dtos/shopping-list/create-shopping-list.dto';
import { DeleteShoppingListsDto } from '@/dtos/shopping-list/delete-shopping-lists.dto';
import { DuplicateShoppingListsDto } from '@/dtos/shopping-list/duplicate-shopping-lists.dto';
import { PatchShoppingListDto } from '@/dtos/shopping-list/patch-shopping-list.dto';
import { UpdateShoppingListDto } from '@/dtos/shopping-list/update-shopping-list.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IShoppingList } from '@/interfaces/shopping-list.interface';
import { ShoppingList } from '@/models/shopping-list.model';
import { cannotViewModel } from '@/utils/util';
import { isEmpty } from 'class-validator';
import { ShoppingListTagService } from './shopping-list-tag.service';
import { TagService } from './tag.service';

export class ShoppingListService {
  private readonly tagService = new TagService();
  private readonly shoppingListTagService = new ShoppingListTagService();

  public async getOne(userId: number, uuid: string): Promise<IShoppingList> {
    const shoppingList = await ShoppingList.query()
      .withGraphJoined('owner')
      .withGraphJoined('items')
      .withGraphJoined('tags')
      .where('shopping_lists.uuid', uuid)
      .skipUndefined()
      .first();

    if (isEmpty(shoppingList)) {
      throw new HttpException(404, 'Could not find shopping list');
    }

    if (cannotViewModel(userId, shoppingList)) {
      throw new HttpException(403, 'You do not have permission to view this shopping list');
    }

    return shoppingList as unknown as IShoppingList;
  }

  public async getAll(userId: number): Promise<Array<IShoppingList>> {
    const shoppingLists = await ShoppingList.query()
      .withGraphJoined('owner')
      .withGraphJoined('items')
      .withGraphJoined('tags')
      .where('userId', userId)
      .skipUndefined();

    return shoppingLists as unknown as Array<IShoppingList>;
  }

  public async createOne(userId: number, { tags, ...dto }: CreateShoppingListDto): Promise<IShoppingList> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid shopping list data');
    }

    const shoppingList = await ShoppingList.query()
      .insertAndFetch({ userId, ...dto })
      .withGraphJoined('owner')
      .withGraphJoined('items')
      .withGraphJoined('tags')
      .skipUndefined();

    return shoppingList as unknown as IShoppingList;
  }

  public async patchOne(userId: number, uuid: string, dto: PatchShoppingListDto): Promise<IShoppingList> {
    const shoppingList = await ShoppingList.query().where('uuid', uuid).first();
    if (isEmpty(shoppingList)) {
      throw new HttpException(404, 'Could not find shopping list');
    }

    if (cannotViewModel(userId, shoppingList)) {
      throw new HttpException(403, 'You do not have permission to edit this shopping list');
    }

    const updated = await shoppingList
      .$query()
      .withGraphJoined('owner')
      .withGraphJoined('items')
      .withGraphJoined('tags')
      .patchAndFetch(dto)
      .skipUndefined();

    return updated as unknown as IShoppingList;
  }

  public async updateOne(userId: number, uuid: string, dto: UpdateShoppingListDto): Promise<IShoppingList> {
    const shoppingList = await ShoppingList.query().where('uuid', uuid).first();
    if (isEmpty(shoppingList)) {
      throw new HttpException(404, 'Could not find shopping list');
    }

    if (cannotViewModel(userId, shoppingList)) {
      throw new HttpException(403, 'You do not have permission to edit this shopping list');
    }

    const updated = await shoppingList
      .$query()
      .withGraphJoined('owner')
      .withGraphJoined('items')
      .withGraphJoined('tags')
      .updateAndFetch(dto)
      .skipUndefined();

    return updated as unknown as IShoppingList;
  }

  public async deleteOne(userId: number, uuid: string): Promise<IShoppingList> {
    const shoppingList = await ShoppingList.query()
      .withGraphJoined('owner')
      .withGraphJoined('items')
      .withGraphJoined('tags')
      .where('shopping_lists.uuid', uuid)
      .skipUndefined()
      .first();

    if (isEmpty(shoppingList)) {
      throw new HttpException(404, 'Could not find shopping list');
    }

    if (cannotViewModel(userId, shoppingList)) {
      throw new HttpException(403, 'You do not have permission to edit this shopping list');
    }

    await shoppingList.$query().delete();

    return shoppingList as unknown as IShoppingList;
  }

  public async deleteMany(userId: number, dto: DeleteShoppingListsDto): Promise<Array<IShoppingList>> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid list of shopping lists provided');
    }

    return await Promise.all(dto.uuids.map(uuid => this.deleteOne(userId, uuid)));
  }

  public async duplicateOne(userId: number, shoppingListId: string): Promise<IShoppingList> {
    const shoppingList = await ShoppingList.query().where('uuid', shoppingListId).first();
    if (isEmpty(shoppingList)) {
      throw new HttpException(404, 'Could not find shopping list');
    }

    if (cannotViewModel(userId, shoppingList)) {
      throw new HttpException(403, 'You do not have permission to edit this shopping list');
    }

    const clone = ShoppingList.clone(shoppingList);
    const cloned = await ShoppingList.query()
      .withGraphJoined('owner')
      .withGraphJoined('items')
      .withGraphJoined('tags')
      .insertAndFetch({
        uuid: clone.uuid,
        name: clone.name,
        slug: clone.slug,
        userId: clone.userId,
        createdAt: clone.createdAt,
        updatedAt: clone.updatedAt,
      })
      .skipUndefined();

    return cloned as unknown as IShoppingList;
  }

  public async duplicateMany(userId: number, dto: DuplicateShoppingListsDto): Promise<Array<IShoppingList>> {
    if (isEmpty(dto)) {
      throw new HttpException(422, 'Invalid list of shopping lists provided');
    }

    return await Promise.all(dto.uuids.map(uuid => this.duplicateOne(userId, uuid)));
  }
}
