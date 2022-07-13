import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  knex.schema.alterTable('users', table => {
    table.dropForeign(['user_type_id']);
    table.bigInteger('user_type_id').unsigned().index().references('id').inTable('user_types').onUpdate('SET NULL').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.alterTable('users', table => {
    table.dropForeign(['user_type_id']);
    table.bigInteger('user_type_id').unsigned().index().references('id').inTable('user_types');
  });
}
