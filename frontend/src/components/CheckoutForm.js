import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { orderId, amount } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const res = await fetch('http://localhost:5002/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert('Payment failed');
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Pay ₹{amount}</h2>
      <CardElement className="p-2 border rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
