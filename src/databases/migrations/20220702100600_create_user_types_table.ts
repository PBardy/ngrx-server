import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_types', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.enum('tag', ['ADMIN', 'SELLER', 'CUSTOMER']).notNullable();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_types');
}
