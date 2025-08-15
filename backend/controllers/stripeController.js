export const createCheckoutSession = async (req, res) => {
  try {
    const { items, email } = req.body; // ✅ Added email destructuring

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided for checkout.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email || 'guest@example.com', // ✅ Prevent undefined
      line_items: items.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.REACT_APP_BASE_URL}/success`,
      cancel_url: `${process.env.REACT_APP_BASE_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: error.message });
  }
};
