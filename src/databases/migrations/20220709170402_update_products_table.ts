import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('products', table => {
    table.enum('availability', ['AVAILABLE', 'UNAVAILABLE']).defaultTo('UNAVAILABLE').notNullable().after('price');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('products', table => {
    table.dropColumn('availability');
  });
}
