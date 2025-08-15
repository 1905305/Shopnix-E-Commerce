import axios from 'axios';

const API = axios.create({
  baseURL: 'https://shopnix-e-commerce.onrender.com/api',
});

export const createOrder = (orderData, token) =>
  API.post('/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchUserOrders = (token) =>
  API.get('/orders/myorders', {
    headers: { Authorization: `Bearer ${token}` },
  });
