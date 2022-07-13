import * as Knex from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  await knex('locations').del();

  const amount = 100;

  for (let i = 0; i < amount; i++) {
    await knex('locations').insert({
      name: faker.address.cityName(),
      description: faker.lorem.lines(),
      uuid: faker.datatype.uuid(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}
