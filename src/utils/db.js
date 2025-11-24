import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || 'skillswap_user',
  password: process.env.PGPASSWORD || 'skillswap_password',
  database: process.env.PGDATABASE || 'skillswap',
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
});


