import { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert('Failed to update order status');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar with Logout */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Palmonas Order Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Orders Table */}
      <div className="p-6">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Platform</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td className="p-2 border">{o.orderId}</td>
                <td className="p-2 border">{o.customerName}</td>
                <td className="p-2 border">{o.platform}</td>
                <td className="p-2 border">{o.status}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => updateStatus(o.orderId, 'shipped')}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Mark Shipped
                  </button>
                  <button
                    onClick={() => updateStatus(o.orderId, 'delivered')}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Mark Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
