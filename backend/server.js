// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import ordersRoutes from './routes/orders.js';
import stripeRoutes from './routes/stripe.js';

const app = express();

// Enable CORS
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

/**
 * 🔹 Webhook route must come BEFORE express.json()
 * and must use raw body parsing, otherwise Stripe signature verification fails
 */
app.post(
  '/api/stripe/webhook',
  bodyParser.raw({ type: 'application/json' }),
  stripeRoutes
);

// Normal JSON parsing for all other routes
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api/orders', ordersRoutes);
app.use('/api/stripe', stripeRoutes);

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('UNCAUGHT ERROR:', err);
  res.status(500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
