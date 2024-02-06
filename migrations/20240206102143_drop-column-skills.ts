import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('vacancies', function(table) {
    table.dropColumn('skills');
  })
  .then(() => {
    console.log(`Столбец skills в таблице vacancies успешно удален.`);
    knex.destroy(); // Закрываем соединение после вып-ия операции
  })
  .catch((error) => {
    console.error(`Ошибка при удалении таблицы skills:`, error);
    knex.destroy();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('vacancies', function(table) {
    table.string('skills'); // Добавляем столбец skills обратно
  })
  .then(() => {
    console.log(`Столбец skills в таблице vacancies успешно добавлен обратно.`);
    knex.destroy(); // Закрываем соединение после вып-ия операции
  })
  .catch((error) => {
    console.error(`Ошибка при добавлении столбца skills:`, error);
    knex.destroy();
  });
}
