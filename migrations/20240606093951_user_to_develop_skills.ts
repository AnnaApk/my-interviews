import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_to_develop_skills', function (table) {
    table.integer('user_id').notNullable();
    table.integer('skill_id').notNullable();
    table.integer('skill_required_level').notNullable().checkBetween([1,2,3,4,5]);
    table.primary(['user_id', 'skill_id']);
    table.foreign('user_id').references('users.id');
    table.foreign('skill_id').references('skills.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_to_develop_skills')
  .then(() => {
    console.log(`Таблица user_skills успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы user_skills:`, error);
    knex.destroy();
  });
}
