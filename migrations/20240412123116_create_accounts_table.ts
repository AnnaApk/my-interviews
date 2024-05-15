import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts', function(table) {
    table.increments('id').primary();
    table.integer('userId').notNullable().references('id').inTable('users');
    table.string('type').notNullable();
    table.string('provider').notNullable().unique();
    table.string('providerAccountId').notNullable().unique();
    table.text('refresh_token');
    table.text('access_token');
    table.integer('expires_at');
    table.string('token_type');
    table.text('scope');
    table.text('id_token');
    table.text('session_state');
    table.text('oauth_token_secret');
    table.text('oauth_token');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('accounts')
  .then(() => {
    console.log(`Таблица accounts успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы accounts:`, error);
    knex.destroy(); // Закрываем соединение в случае ошибки
  });
}
