import { Router } from 'express';
import { pool } from '../utils/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Request a skill exchange
router.post('/', requireAuth, async (req, res) => {
  try {
    const { providerId, requestedSkillId, offeredSkillId, message } = req.body;
    const requesterId = req.user.id;

    if (!providerId || !requestedSkillId || !offeredSkillId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO skill_exchanges (requester_id, provider_id, requested_skill_id, offered_skill_id, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, requester_id AS "requesterId", provider_id AS "providerId", requested_skill_id AS "requestedSkillId", offered_skill_id AS "offeredSkillId", status, message, created_at AS "createdAt"`,
      [requesterId, providerId, requestedSkillId, offeredSkillId, message || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get exchanges for a user (as requester or provider)
router.get('/user/:userId', requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.user.id !== parseInt(userId)) return res.status(403).json({ error: 'Forbidden' });

    const { rows } = await pool.query(
      `SELECT se.id, se.requester_id AS "requesterId", se.provider_id AS "providerId",
              se.requested_skill_id AS "requestedSkillId", se.offered_skill_id AS "offeredSkillId",
              se.status, se.message, se.requester_rating AS "requesterRating", se.provider_rating AS "providerRating",
              se.requester_feedback AS "requesterFeedback", se.provider_feedback AS "providerFeedback",
              se.scheduled_date AS "scheduledDate", se.completed_date AS "completedDate",
              se.created_at AS "createdAt", se.updated_at AS "updatedAt",
              r.username AS "requesterUsername", r.first_name AS "requesterFirstName", r.last_name AS "requesterLastName",
              p.username AS "providerUsername", p.first_name AS "providerFirstName", p.last_name AS "providerLastName",
              rs.name AS "requestedSkillName", os.name AS "offeredSkillName"
       FROM skill_exchanges se
       JOIN users r ON r.id = se.requester_id
       JOIN users p ON p.id = se.provider_id
       JOIN skills rs ON rs.id = se.requested_skill_id
       JOIN skills os ON os.id = se.offered_skill_id
       WHERE se.requester_id = $1 OR se.provider_id = $1
       ORDER BY se.created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update exchange status (accept, reject, complete, cancel)
router.put('/:id/status', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g., 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS'
    const userId = req.user.id;

    const { rows: exchangeRows } = await pool.query('SELECT requester_id, provider_id FROM skill_exchanges WHERE id=$1', [id]);
    if (exchangeRows.length === 0) return res.status(404).json({ error: 'Exchange not found' });

    const exchange = exchangeRows[0];
    if (exchange.requester_id !== userId && exchange.provider_id !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const result = await pool.query(
      `UPDATE skill_exchanges SET status=$1, updated_at=NOW() WHERE id=$2
       RETURNING id, status, updated_at AS "updatedAt"`,
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Add rating and feedback
router.put('/:id/feedback', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, feedback, isRequester } = req.body; // isRequester: true if current user is the requester, false if provider
    const userId = req.user.id;

    const { rows: exchangeRows } = await pool.query('SELECT requester_id, provider_id FROM skill_exchanges WHERE id=$1', [id]);
    if (exchangeRows.length === 0) return res.status(404).json({ error: 'Exchange not found' });

    const exchange = exchangeRows[0];
    if (isRequester && exchange.requester_id !== userId) return res.status(403).json({ error: 'Forbidden' });
    if (!isRequester && exchange.provider_id !== userId) return res.status(403).json({ error: 'Forbidden' });

    let query;
    let params;
    if (isRequester) {
      query = `UPDATE skill_exchanges SET requester_rating=$1, requester_feedback=$2, updated_at=NOW() WHERE id=$3 RETURNING *`;
      params = [rating, feedback, id];
    } else {
      query = `UPDATE skill_exchanges SET provider_rating=$1, provider_feedback=$2, updated_at=NOW() WHERE id=$3 RETURNING *`;
      params = [rating, feedback, id];
    }

    const result = await pool.query(query, params);
    res.json(result.rows[0]);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;