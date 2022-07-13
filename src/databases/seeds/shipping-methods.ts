import { faker } from '@faker-js/faker';
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('shipping_methods').del();

  await knex('shipping_methods').insert({
    price: 1.5,
    slug: 'standard-delivery',
    name: 'Standard Delivery',
    uuid: faker.datatype.uuid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  await knex('shipping_methods').insert({
    price: 1.5,
    slug: 'express-delivery',
    name: 'Express Delivery',
    uuid: faker.datatype.uuid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  await knex('shipping_methods').insert({
    price: 5.0,
    slug: 'premium-delivery',
    name: 'Premium Delivery',
    uuid: faker.datatype.uuid(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}
