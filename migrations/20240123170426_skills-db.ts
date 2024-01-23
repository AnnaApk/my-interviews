import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('skills', function (table) {
    table.increments('id');
    table.string('skill');
    table.string('grade_1');
    table.string('grade_2');
    table.string('grade_3');
    table.string('grade_4');
    table.string('grade_5');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('skills')
  .then(() => {
    console.log(`Таблица skills успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы skills:`, error);
    knex.destroy(); // Закрываем соединение в случае ошибки
  });
}
