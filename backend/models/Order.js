import { db } from '../config/firebaseAdmin.js';
import admin from 'firebase-admin';

export async function createOrder(orderData) {
  const orderRef = db.collection('orders').doc();
  await orderRef.set({
    ...orderData,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return orderRef.id;
}

export async function getOrdersByUser(userId) {
  const snapshot = await db.collection('orders')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  const orders = [];
  snapshot.forEach(doc => {
    orders.push({ id: doc.id, ...doc.data() });
  });
  return orders;
}
