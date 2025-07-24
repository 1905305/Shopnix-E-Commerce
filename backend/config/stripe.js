// config/stripe.js
const Stripe = require('stripe');

// Ensure your .env has: STRIPE_SECRET_KEY=sk_test_...

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
