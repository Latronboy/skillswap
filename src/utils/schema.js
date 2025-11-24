import { pool } from './db.js';

export async function ensureSchema() {
  // Create tables if not exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      bio VARCHAR(500),
      location VARCHAR(100),
      profile_image_url VARCHAR(200),
      is_verified BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      description VARCHAR(500),
      category VARCHAR(50) NOT NULL,
      icon_url VARCHAR(200),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS user_skills (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      skill_type VARCHAR(10) NOT NULL, -- OFFER or LEARN
      proficiency_level INTEGER,
      description VARCHAR(1000),
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (user_id, skill_id, skill_type)
    );

    CREATE TABLE IF NOT EXISTS skill_exchanges (
      id SERIAL PRIMARY KEY,
      requester_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      provider_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      requested_skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      offered_skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'PENDING' NOT NULL,
      message VARCHAR(1000),
      requester_rating INTEGER CHECK (requester_rating >= 1 AND requester_rating <= 5),
      provider_rating INTEGER CHECK (provider_rating >= 1 AND provider_rating <= 5),
      requester_feedback VARCHAR(1000),
      provider_feedback VARCHAR(1000),
      scheduled_date TIMESTAMP,
      completed_date TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      content VARCHAR(2000) NOT NULL,
      exchange_id INTEGER REFERENCES skill_exchanges(id) ON DELETE SET NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Seed skills if empty
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM skills');
  if (rows[0].count === 0) {
    await pool.query(`
      INSERT INTO skills (name, description, category, is_active)
      VALUES
      ('Web Development','Frontend and backend web development skills','Technology',true),
      ('Digital Marketing','SEO, social media, and content marketing','Business',true),
      ('Language Learning','Teaching and learning foreign languages','Education',true),
      ('Photography','Portrait, landscape, and commercial photography','Arts',true),
      ('Data Science','Python, machine learning, and data analysis','Technology',true),
      ('Cooking','Various cuisines and cooking techniques','Lifestyle',true),
      ('Music','Guitar, piano, and music theory','Arts',true),
      ('Fitness Training','Yoga, weight training, and nutrition','Health',true),
      ('Graphic Design','Adobe Creative Suite and design principles','Arts',true),
      ('Public Speaking','Presentation skills and communication','Business',true);
    `);
  }
}


