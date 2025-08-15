// backend/controllers/orderController.js
import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, address } = req.body;

    if (!userId || !items || !totalAmount || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      address,
      createdAt: new Date()
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: 'User ID missing' });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Fetch Orders Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
