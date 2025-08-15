// backend/routes/orders.js
import express from 'express';
import admin from '../config/firebaseAdmin.js';

const router = express.Router();
const db = admin.firestore();

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection('orders')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();

    const orders = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        sessionId: data.sessionId || null,
        userId: data.userId,
        items: Array.isArray(data.items) ? data.items : [], // ✅ always array
        amount_total: data.amount_total,
        currency: data.currency,
        payment_status: data.payment_status,
        createdAt: data.createdAt?.toDate().toISOString() || null
      };
    });

    res.json(orders); // ✅ send as array
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
