// backend/controllers/stripeController.js
const stripe = require('../config/stripe');

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', description, metadata } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      metadata,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Payment intent creation failed' });
  }
};

module.exports = { createPaymentIntent };
