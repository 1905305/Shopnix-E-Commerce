import dotenv from 'dotenv';
dotenv.config(); // ✅ Load env vars immediately

import admin from '../config/firebaseAdmin.js';
import Stripe from 'stripe';
import express from 'express';

const router = express.Router();

// ✅ Make sure STRIPE_SECRET_KEY is loaded
console.log('🔑 STRIPE_SECRET_KEY loaded:', process.env.STRIPE_SECRET_KEY ? 'YES' : 'NO');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });

router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log('✅ Webhook verified:', event.type);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.userId || 'guest';

      console.log('💳 Checkout completed for user:', userId);
      console.log('📦 Session metadata:', session.metadata);
      console.log('💰 Amount:', session.amount_total, session.currency);

      const items = JSON.parse(session.metadata?.items || '[]');
      const newOrder = {
        sessionId: session.id,
        userId,
        items,
        amount_total: session.amount_total || 0,
        currency: session.currency || 'inr',
        payment_status: session.payment_status || 'paid',
        createdAt: admin.firestore.Timestamp.fromDate(
          new Date(session.created * 1000)
        )
      };

      try {
        console.log('📝 Saving order to Firestore:', newOrder);
        await admin.firestore().collection('orders').add(newOrder);
        console.log('✅ Order saved successfully for user:', userId);
      } catch (err) {
        console.error('❌ Error saving order to Firestore:', err);
      }
    }

    res.json({ received: true });
  }
);

export default router;
