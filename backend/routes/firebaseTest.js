import express from 'express';
import { db } from '../config/firebaseAdmin.js';

const router = express.Router();

router.get('/test-firebase', async (req, res) => {
  try {
    await db.collection('testCheck').doc('ping').set({
      timestamp: new Date().toISOString(),
    });
    res.send('✅ Firebase connected');
  } catch (e) {
    console.error(e);
    res.status(500).send('❌ Firebase failed');
  }
});

export default router;
