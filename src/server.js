import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import skillsRoutes from './routes/skills.js';
import userSkillsRoutes from './routes/userSkills.js';
import skillExchangesRoutes from './routes/skillExchanges.js';
import messagesRoutes from './routes/messages.js';
import { pool } from './utils/db.js';
import { ensureSchema } from './utils/schema.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  credentials: true
}));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'db_error', error: e.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/user-skills', userSkillsRoutes);
app.use('/api/skill-exchanges', skillExchangesRoutes);
app.use('/api/messages', messagesRoutes);

const port = process.env.PORT || 8080;

ensureSchema()
  .then(() => {
    app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Failed to initialize schema:', err);
    process.exit(1);
  });


