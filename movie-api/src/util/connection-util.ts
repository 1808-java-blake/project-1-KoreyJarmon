import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: process.env["1808_MOVIE_DB_USERNAME"],
  host: 'revature-1808.cr5x28u4d6hv.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: process.env["1808_MOVIE_DB_PASSWORD"],
  port: 5432,
  max: 2
})
