import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('products', table => {
    table.string('image').nullable().after('uuid');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('products', table => {
    table.dropColumn('image');
  });
}
