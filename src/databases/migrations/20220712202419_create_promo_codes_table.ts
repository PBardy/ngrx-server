import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('promo_codes', table => {
    table.bigIncrements().unsigned().primary();
    table.uuid('uuid').notNullable();
    table.string('code').notNullable().unique();
    table.bigInteger('max_uses').notNullable();
    table.bigInteger('campaign_id').unsigned().index().references('id').inTable('campaigns').notNullable().onDelete('cascade');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('promo_codes');
}
