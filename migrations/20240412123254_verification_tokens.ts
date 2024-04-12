import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('verification_tokens', function(table) {
    table.string('identifier', 255);
    table.text('token').notNullable();
    table.primary(['identifier', 'token']);
    table.timestamp('expires', { useTz: true }).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('verification_tokens')
  .then(() => {
    console.log(`Таблица verification_tokens успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы verification_tokens:`, error);
    knex.destroy(); // Закрываем соединение в случае ошибки
  });
}
