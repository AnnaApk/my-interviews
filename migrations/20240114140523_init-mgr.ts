import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('vacancies', function (table) {
    table.increments('id');
    table.string('title');
    table.string('time');
    table.string('date');
    table.string('skills');
    table.string('description');
    table.string('company');
    table.string('recruiter');
    table.string('contact');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('vacancies')
  .then(() => {
    console.log(`Таблица vacancies успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы Vacancies:`, error);
    knex.destroy(); // Закрываем соединение в случае ошибки
  });
}
