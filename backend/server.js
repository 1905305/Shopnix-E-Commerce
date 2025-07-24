// server/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

// Load environment variables
dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not set in .env');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Change to specific origin in production
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('✅ Stripe payment server is running');
});

// Stripe Checkout Session route
app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid items array' });
  }

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Ensure integer
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe error:', err.message);
    res.status(500).json({ error: 'Payment session creation failed' });
  }
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
