import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('user_types', table => {
    table.string('icon').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('user_types', table => {
    table.dropColumn('icon');
  });
}
