import express from 'express';
import { db } from '../config/firebaseAdmin.js';

const router = express.Router();

// Create order (POST /api/orders)
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount, address } = req.body;
    if (!userId || !items || !totalAmount || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newOrder = { userId, items, totalAmount, address, createdAt: new Date() };
    const docRef = await db.collection('orders').add(newOrder);
    const savedOrder = await docRef.get();
    res.status(201).json({ id: docRef.id, ...savedOrder.data() });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get orders by userId (GET /api/orders/:userId)
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'User ID missing' });
    const snapshot = await db.collection('orders')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
  } catch (err) {
    console.error('Fetch Orders Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
