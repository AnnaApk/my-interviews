import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('vacancy_skills', function (table) {
    table.integer('vacancy_id').notNullable();
    table.integer('skill_id').notNullable();
    table.integer('skill_required_level').notNullable().checkBetween([1,2,3,4,5]);
    table.primary(['vacancy_id', 'skill_id']);
    table.foreign('vacancy_id').references('vacancies.id');
    table.foreign('skill_id').references('skills.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('vacancy_skills')
  .then(() => {
    console.log(`Таблица vacancy_skills успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы vacancy_skills:`, error);
    knex.destroy();
  });
}
