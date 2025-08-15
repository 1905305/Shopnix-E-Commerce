import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe object with your publishable key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;
