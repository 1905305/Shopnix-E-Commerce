import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createOrder = (orderData, token) =>
  API.post('/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchUserOrders = (token) =>
  API.get('/orders/myorders', {
    headers: { Authorization: `Bearer ${token}` },
  });
