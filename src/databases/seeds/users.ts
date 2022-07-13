import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const amount = 10;

  for (let i = 0; i < amount; i++) {
    await knex('users').insert({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: await hash(faker.random.alphaNumeric(), 10),
      user_type_id: (await knex('user_types').orderByRaw('RAND()').first()).id,
      uuid: faker.datatype.uuid(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}
