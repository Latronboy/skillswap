import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../utils/db.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, bio, location, profileImageUrl } = req.body;
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const exists = await pool.query('SELECT 1 FROM users WHERE username=$1 OR email=$2', [username, email]);
    if (exists.rowCount > 0) return res.status(400).json({ error: 'Username or email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, email, password, first_name, last_name, bio, location, profile_image_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, username, email, first_name AS "firstName", last_name AS "lastName", bio, location, profile_image_url AS "profileImageUrl", is_verified AS "isVerified", is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt"`,
      [username, email, hash, firstName, lastName, bio || null, location || null, profileImageUrl || null]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (rows.length === 0) return res.status(400).json({ error: 'Invalid username or password' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1d' });
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      bio: user.bio,
      location: user.location,
      profileImageUrl: user.profile_image_url,
      isVerified: user.is_verified,
      isActive: user.is_active,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
    return res.json({ token, user: payload });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.get('/validate', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(400).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const { rows } = await pool.query('SELECT id, username, email, first_name AS "firstName", last_name AS "lastName", bio, location, profile_image_url AS "profileImageUrl", is_verified AS "isVerified", is_active AS "isActive", created_at AS "createdAt", updated_at AS "updatedAt" FROM users WHERE id=$1', [payload.id]);
    if (rows.length === 0) return res.status(400).json({ error: 'User not found' });
    return res.json(rows[0]);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid token' });
  }
});

export default router;


