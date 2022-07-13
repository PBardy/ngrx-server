import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.bigInteger('user_type_id').unsigned().index().references('id').inTable('user_types');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
