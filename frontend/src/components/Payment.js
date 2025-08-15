import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({ cartItems }) => {
  const { currentUser } = useContext(AuthContext);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/stripe/create-checkout-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartItems,
            userId: currentUser?.uid || null, // ✅ Added userId
          }),
        }
      );

      const session = await response.json();

      if (session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        console.error('No session ID returned from backend');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Proceed to Payment
    </button>
  );
};

export default Payment;
