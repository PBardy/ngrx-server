import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('product_properties', table => {
    table.bigInteger('product_id').unsigned().index().references('id').inTable('products').notNullable().onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('product_properties', table => {
    table.dropColumn('product_id');
  });
}
