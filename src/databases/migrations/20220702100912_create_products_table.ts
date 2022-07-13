import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.string('code').notNullable();
    table.string('slug').notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.float('price', 2).notNullable().defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('products');
}
