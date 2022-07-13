import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('shopping_list_items', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.bigInteger('shopping_list_id').unsigned().index().references('id').inTable('shopping_lists').notNullable().onDelete('cascade');
    table.bigInteger('product_id').unsigned().index().references('id').inTable('products').notNullable().onDelete('set null');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('shopping_list_items');
}
