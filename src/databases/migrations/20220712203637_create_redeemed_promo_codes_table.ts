import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('redeemed_promo_codes', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users').notNullable().onDelete('no action');
    table.bigInteger('promo_code_id').unsigned().index().references('id').inTable('promo_codes').notNullable().onDelete('no action');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('redeemed_promo_codes');
}
