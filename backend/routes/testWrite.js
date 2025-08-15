import express from 'express';
import admin from '../config/firebaseAdmin.js';

const router = express.Router();

router.post('/test-write', async (req, res) => {
  try {
    const ordersRef = admin.firestore().collection('orders');
    const docRef = await ordersRef.add({
      userId: 'testUser',
      amount_total: 100,
      items: [{ name: 'Test Item', quantity: 1 }],
      createdAt: admin.firestore.Timestamp.now(),
      payment_status: 'paid',
      currency: 'inr',
      sessionId: 'test-session'
    });
    console.log('Test order saved with id:', docRef.id);
    res.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error('Test write error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
