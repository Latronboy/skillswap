import { Router } from 'express';
import { pool } from '../utils/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const { userId, skillId, skillType, proficiencyLevel, description, isAvailable } = req.body;
    if (!userId || !skillId || !skillType) return res.status(400).json({ error: 'Missing required fields' });

    // Optional: ensure the authenticated user matches userId
    if (req.user.id !== userId) return res.status(403).json({ error: 'Forbidden' });

    const result = await pool.query(
      `INSERT INTO user_skills (user_id, skill_id, skill_type, proficiency_level, description, is_available)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id, user_id AS "userId", skill_id AS "skillId", skill_type AS "skillType", proficiency_level AS "proficiencyLevel", description, is_available AS "isAvailable"`,
      [userId, skillId, skillType, proficiencyLevel || null, description || null, isAvailable ?? true]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { rows } = await pool.query(
    `SELECT us.id, us.user_id AS "userId", us.skill_id AS "skillId", us.skill_type AS "skillType",
            us.proficiency_level AS "proficiencyLevel", us.description, us.is_available AS "isAvailable",
            s.name AS "skillName", s.category AS "skillCategory"
     FROM user_skills us
     JOIN skills s ON s.id = us.skill_id
     WHERE us.user_id = $1
     ORDER BY us.created_at DESC`,
    [userId]
  );
  res.json(rows);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { proficiencyLevel, description, isAvailable } = req.body;
  const result = await pool.query(
    `UPDATE user_skills SET proficiency_level=$1, description=$2, is_available=$3, updated_at=NOW() WHERE id=$4 RETURNING id, user_id AS "userId", skill_id AS "skillId", skill_type AS "skillType", proficiency_level AS "proficiencyLevel", description, is_available AS "isAvailable"`,
    [proficiencyLevel || null, description || null, isAvailable ?? true, id]
  );
  if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM user_skills WHERE id=$1', [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

export default router;


