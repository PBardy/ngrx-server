import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_products', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users').notNullable().onDelete('cascade');
    table.bigInteger('product_id').unsigned().index().references('id').inTable('products').notNullable().onDelete('cascade');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_products');
}
