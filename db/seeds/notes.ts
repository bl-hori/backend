import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('notes').del()
    await knex('notes').insert([
      {
        id: 1,
        text: 'Express',
        updatedAt: Date.now() - 2 * 60 * 60 * 1000,
      },
      {
        id: 2,
        text: 'Groceries',
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
      },
      {
        id: 3,
        text: 'Tokyo restaurants',
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
      },
      {
        id: 4,
        text: 'Books to read',
        updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      },
    ])
}