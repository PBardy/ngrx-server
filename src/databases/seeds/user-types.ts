import { UserRole } from '../../interfaces/user-type.inteface';
import { faker } from '@faker-js/faker';
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();
  await knex('user_types').del();

  await knex('user_types').insert({
    tag: UserRole.ADMIN,
    name: 'Admin',
    description: faker.lorem.lines(),
    icon: faker.image.imageUrl(),
    uuid: faker.datatype.uuid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  await knex('user_types').insert({
    tag: UserRole.SELLER,
    name: 'Seller',
    description: faker.lorem.lines(),
    icon: faker.image.imageUrl(),
    uuid: faker.datatype.uuid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  await knex('user_types').insert({
    tag: UserRole.CUSTOMER,
    name: 'Customer',
    description: faker.lorem.lines(),
    icon: faker.image.imageUrl(),
    uuid: faker.datatype.uuid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}
