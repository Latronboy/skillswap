import { Router } from 'express';
import { pool } from '../utils/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query(`
    SELECT s.id, s.name, s.description, s.category, s.icon_url AS "iconUrl", s.is_active AS "isActive",
           COALESCE((SELECT COUNT(*) FROM user_skills us WHERE us.skill_id = s.id AND us.skill_type = 'OFFER'), 0) AS "userCount"
    FROM skills s
    WHERE s.is_active = true
    ORDER BY s.name ASC
  `);
  res.json(rows);
});

router.get('/categories', async (_req, res) => {
  const { rows } = await pool.query('SELECT DISTINCT category FROM skills WHERE is_active = true ORDER BY category');
  res.json(rows.map(r => r.category));
});

router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  const { rows } = await pool.query(
    `SELECT id, name, description, category, icon_url AS "iconUrl", is_active AS "isActive" FROM skills WHERE is_active = true AND category = $1 ORDER BY name`,
    [category]
  );
  res.json(rows);
});

router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);
  const q = `%${query}%`;
  const { rows } = await pool.query(
    `SELECT id, name, description, category, icon_url AS "iconUrl", is_active AS "isActive"
     FROM skills
     WHERE is_active = true AND (LOWER(name) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1) OR LOWER(category) LIKE LOWER($1))
     ORDER BY name`,
    [q]
  );
  res.json(rows);
});

export default router;

router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, description, category, iconUrl } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Missing required fields' });

    const exists = await pool.query('SELECT 1 FROM skills WHERE name=$1', [name]);
    if (exists.rowCount > 0) return res.status(400).json({ error: 'Skill with this name already exists' });

    const result = await pool.query(
      `INSERT INTO skills (name, description, category, icon_url)
       VALUES ($1,$2,$3,$4)
       RETURNING id, name, description, category, icon_url AS "iconUrl", is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt"`,
      [name, description || null, category, iconUrl || null]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, iconUrl, isActive } = req.body;

    const result = await pool.query(
      `UPDATE skills SET name=$1, description=$2, category=$3, icon_url=$4, is_active=$5, updated_at=NOW()
       WHERE id=$6
       RETURNING id, name, description, category, icon_url AS "iconUrl", is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt"`,
      [name, description || null, category, iconUrl || null, isActive ?? true, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Skill not found' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE skills SET is_active=FALSE, updated_at=NOW() WHERE id=$1 RETURNING id`,
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Skill not found' });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

