import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { FaClock } from 'react-icons/fa';

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const userId = user?.uid || 'guest';
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${userId}`);

        setOrders(res.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-4xl font-bold text-gray-700">
        <FaClock className="inline mr-4 animate-spin text-blue-500" />
        Loading order history...
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
      {orders.length === 0 ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 text-center">
          {/* Text Section */}
          <div className="max-w-2xl">
            <h2 className="text-7xl font-extrabold text-gray-800 mb-10">
              No Orders Found
            </h2>
            <p className="text-5xl text-gray-600 mb-6">
              For invoice, please <span className="font-bold">contact the admin</span>.
            </p>
            <p className="text-5xl text-gray-600">
              Order history will be available <span className="font-bold">soon</span>.
            </p>
          </div>

          {/* GIF Section */}
          <img
            src="/assets/noorder.gif"
            alt="No Orders"
            className="w-[800px] h-[800px] object-contain"
          />
        </div>
      ) : (
        <p className="text-5xl font-bold">Orders will be shown here soon.</p>
      )}
    </div>
  );
};

export default OrderHistory;
