import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('campaigns', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users').notNullable().onDelete('cascade');
    table.timestamp('start_date').notNullable().defaultTo(knex.fn.now());
    table.timestamp('end_date').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('campaigns');
}
