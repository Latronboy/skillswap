import { Router } from 'express';
import { pool } from '../utils/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Send a message
router.post('/', requireAuth, async (req, res) => {
  try {
    const { receiverId, content, exchangeId } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, content, exchange_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, sender_id AS "senderId", receiver_id AS "receiverId", content, exchange_id AS "exchangeId", is_read AS "isRead", created_at AS "createdAt"`,
      [senderId, receiverId, content, exchangeId || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get conversation between two users
router.get('/conversation/:otherUserId', requireAuth, async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.user.id;

    const { rows } = await pool.query(
      `SELECT m.id, m.sender_id AS "senderId", m.receiver_id AS "receiverId", m.content, m.exchange_id AS "exchangeId",
              m.is_read AS "isRead", m.created_at AS "createdAt",
              s.username AS "senderUsername", r.username AS "receiverUsername"
       FROM messages m
       JOIN users s ON s.id = m.sender_id
       JOIN users r ON r.id = m.receiver_id
       WHERE (m.sender_id = $1 AND m.receiver_id = $2) OR (m.sender_id = $2 AND m.receiver_id = $1)
       ORDER BY m.created_at ASC`,
      [userId, otherUserId]
    );

    // Mark messages as read if the current user is the receiver
    await pool.query(
      `UPDATE messages SET is_read = TRUE WHERE receiver_id = $1 AND sender_id = $2 AND is_read = FALSE`,
      [userId, otherUserId]
    );

    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get unread message count for a user
router.get('/unread-count', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { rows } = await pool.query(
      `SELECT COUNT(*)::int AS "unreadCount" FROM messages WHERE receiver_id = $1 AND is_read = FALSE`,
      [userId]
    );
    res.json(rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get all conversations for a user (distinct partners)
router.get('/conversations', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { rows } = await pool.query(
      `SELECT DISTINCT ON (CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END)
              CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END AS "partnerId",
              CASE WHEN sender_id = $1 THEN r.username ELSE s.username END AS "partnerUsername",
              m.content AS "lastMessage",
              m.created_at AS "lastMessageAt",
              (SELECT COUNT(*) FROM messages WHERE receiver_id = $1 AND sender_id = (CASE WHEN m.sender_id = $1 THEN m.receiver_id ELSE m.sender_id END) AND is_read = FALSE) AS "unreadCount"
       FROM messages m
       JOIN users s ON s.id = m.sender_id
       JOIN users r ON r.id = m.receiver_id
       WHERE m.sender_id = $1 OR m.receiver_id = $1
       ORDER BY "partnerId", m.created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;