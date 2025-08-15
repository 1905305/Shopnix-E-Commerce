import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <p className="text-sm text-gray-500 mb-2">
        <strong>Order ID:</strong> {order.id}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Status:</strong>{' '}
        <span
          className={
            order.status === 'paid'
              ? 'text-green-600 font-semibold'
              : 'text-yellow-600 font-semibold'
          }
        >
          {order.status}
        </span>
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Total:</strong> ₹{order.totalAmount}
      </p>
      <div>
        <p className="font-medium mb-1">Items:</p>
        <ul className="list-disc ml-6 text-sm">
          {order.items.map((item, index) => (
            <li key={index}>
              {item.title} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderCard;
