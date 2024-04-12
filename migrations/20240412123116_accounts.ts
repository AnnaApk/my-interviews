import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('accounts', function(table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.string('provider_id', 255).notNullable();
    table.string('provider_type', 255).notNullable();
    table.string('provider_account_id', 255).notNullable();
    table.text('refresh_token');
    table.text('access_token').notNullable();
    table.timestamp('expires_at', { useTz: true });
    table.string('token_type', 255);
    table.text('scope');
    table.text('id_token');
    table.text('session_state');
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
