import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('email'); // .unique()
    table.string('name');
    table.string('role');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  .then(() => {
    console.log(`Таблица users успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы users:`, error);
    knex.destroy(); // Закрываем соединение в случае ошибки
  });
}
