import 'dotenv/config'
import { knex as setupKnex, type Knex } from 'knex'

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
      filename: process.env.DB || './db/dev.db',
    },
    useNullAsDefault: true,
    migrations: {
      extension: 'ts',
      directory: './db/migrations',
    },
    seeds: {
        extension: 'ts',
        directory: './db/seeds',
      },
}

  export const knex = setupKnex(config)