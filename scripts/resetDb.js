import { pool } from '../src/utils/db.js';
import { ensureSchema } from '../src/utils/schema.js';

async function main() {
  try {
    await pool.query('DROP TABLE IF EXISTS messages');
    await pool.query('DROP TABLE IF EXISTS skill_exchanges');
    await pool.query('DROP TABLE IF EXISTS user_skills');
    await pool.query('DROP TABLE IF EXISTS skills');
    await pool.query('DROP TABLE IF EXISTS users');
    await ensureSchema();
    console.log('Database reset and seeded.');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();


