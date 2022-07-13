import * as Knex from 'knex';
import { faker } from '@faker-js/faker';
import { Tag } from '@/models/tag.model';

export async function seed(knex: Knex): Promise<void> {
  await knex('tags').del();

  const amount = 1000;

  for (let i = 0; i < amount; i++) {
    await knex('tags').insert({
      name: faker.word.noun(),
      uuid: faker.datatype.uuid(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}
