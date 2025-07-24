import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const userOrdersRef = collection(db, 'orders', user.uid, 'userOrders');
        const q = query(userOrdersRef, orderBy('createdAt', 'desc'), limit(10));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  const getDeliveryDate = (createdAt) => {
    const orderDate = createdAt?.seconds ? new Date(createdAt.seconds * 1000) : new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 2) + 3);
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>My Recent Orders</h2>

      {orders.map((order, i) => (
        <div key={order.id} style={orderCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <h4 style={{ margin: 0 }}>Order #{orders.length - i}</h4>
              <p style={{ margin: 0, fontSize: '14px' }}>Order ID: {order.id}</p>
              <p style={{ margin: 0, fontSize: '14px' }}>Placed on: {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0 }}><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p style={{ margin: 0 }}><strong>Status:</strong> {order.status}</p>
              <p style={{ margin: 0, color: 'green' }}><strong>Delivering on:</strong> {getDeliveryDate(order.createdAt)}</p>
            </div>
          </div>

          {order.items.map((item, idx) => (
            <div key={idx} style={itemCard}>
              <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '16px' }} />
              <div style={{ flex: 1 }}>
                <h5 style={{ margin: '0 0 4px 0' }}>{item.title}</h5>
                <p style={{ margin: 0, fontSize: '14px' }}>Brand: {item.brand || 'N/A'}</p>
                <p style={{ margin: 0, fontSize: '14px' }}>Size: {item.size || 'N/A'}</p>
                <p style={{ margin: '6px 0 0 0' }}>₹{item.price} x {item.quantity}</p>
                <button
                  onClick={() => alert('Return/Exchange popup here')}
                  style={actionBtn}
                >
                  Return / Exchange
                </button>
                <button
                  onClick={() => alert('Rate product popup here')}
                  style={{ ...actionBtn, background: '#ffc107', color: '#000' }}
                >
                  Rate Product
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const orderCard = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '30px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
};

const itemCard = {
  display: 'flex',
  alignItems: 'center',
  background: '#f9f9f9',
  borderRadius: '8px',
  padding: '10px',
  marginTop: '10px',
};

const actionBtn = {
  marginTop: '10px',
  marginRight: '10px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

export default Orders;
