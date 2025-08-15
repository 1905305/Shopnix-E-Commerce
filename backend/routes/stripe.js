// backend/routes/stripe.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import admin from '../config/firebaseAdmin.js';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- Webhook endpoint ---
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      await admin.firestore()
        .collection('orders')
        .doc(session.id)
        .set({
          userId: session.metadata.userId || 'guest', // UID from metadata
          email: session.metadata.email || session.customer_email || 'guest@example.com',
          amount_total: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          items: JSON.parse(session.metadata.items || '[]'), // Items from metadata
        });

      console.log(`✅ Order stored for ${session.metadata.email || session.customer_email}`);
    } catch (dbErr) {
      console.error('Error saving order:', dbErr);
    }
  }

  res.json({ received: true });
});

// --- Checkout session ---
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { email, userId, items } = req.body;

    if (!email || !items || !items.length) {
      return res.status(400).json({ error: 'Email and items are required' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email, // ✅ This ensures Stripe sends receipt email automatically
      line_items: items.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.REACT_APP_BASE_URL}/success`,
      cancel_url: `${process.env.REACT_APP_BASE_URL}/cancel`,
      
      metadata: {
        userId: userId || 'guest', // ✅ This is where UID will come from frontend
        email: email || 'guest@example.com',
        items: JSON.stringify(items) // ✅ Store items for webhook
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error.message);
    res.status(500).json({ error: 'Checkout session creation failed' });
  }
});

// --- Get orders by user ---
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await admin.firestore()
      .collection('orders')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
