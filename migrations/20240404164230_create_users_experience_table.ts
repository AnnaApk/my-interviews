import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_experience', function (table) {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.string('date_start');
    table.string('date_end').after('date_start'); //порядок столбцов в таблице
    table.string('company');
    table.string('achiev');
    table.string('stack');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_experience')
  .then(() => {
    console.log(`Таблица users_experience успешно удалена.`);
    knex.destroy(); // Закрываем соединение после выполнения операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы users_experience:`, error);
    knex.destroy();
  });
}
