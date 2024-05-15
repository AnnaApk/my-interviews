import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sessions', function(table) {
    table.increments('id').primary();
    table.text('sessionToken').notNullable().unique();
    table.integer('userId').notNullable().references('id').inTable('users');
    table.timestamp('expires').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sessions')
  .then(() => {
    console.log(`Таблица sessions успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы sessions:`, error);
    knex.destroy(); // Закрываем соединение в случае ошибки
  });
}
