import React from 'react';

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h3 className="text-lg font-bold mb-4">Order Details</h3>
        <p><b>Order ID:</b> {order.orderId}</p>
        <p><b>Customer:</b> {order.customerName}</p>
        <p><b>Platform:</b> {order.platform}</p>
        <p><b>Status:</b> {order.status}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderDetailsModal; 