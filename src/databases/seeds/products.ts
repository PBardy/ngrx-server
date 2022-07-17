import * as Knex from 'knex';
import { faker } from '@faker-js/faker';
import { ProductAvailability } from '../../interfaces/product.interface';
import { randomChoice } from '../../utils/util';
import slugify from 'slugify';

export async function seed(knex: Knex): Promise<void> {
  await knex('products').del();

  const amount = 100;

  for (let i = 0; i < amount; i++) {
    const productName = faker.commerce.productName();
    const productSlug = slugify(productName);

    await knex('products').insert({
      price: 10,
      code: faker.random.alphaNumeric(5),
      name: productName,
      slug: productSlug,
      image: faker.image.food(),
      description: faker.lorem.lines(),
      uuid: faker.datatype.uuid(),
      availability: randomChoice<ProductAvailability>([ProductAvailability.AVAILABLE, ProductAvailability.UNAVAILABLE]),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}
