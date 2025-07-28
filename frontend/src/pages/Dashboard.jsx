import { useEffect, useState } from 'react';
import api from '../api';
import OrderDetailsModal from '../components/OrderDetailsModal';
import NewOrderModal from '../components/NewOrderModal';
import PlatformIcon from '../components/PlatformIcon';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/analytics`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold">Total Orders</h3>
        <p className="text-2xl">{data.totalOrders}</p>
      </div>
      <div className="bg-white p-4 shadow rounded col-span-2">
        <h3 className="text-lg font-bold">Orders by Platform</h3>
        <PieChart width={300} height={200}>
          <Pie
            data={data.ordersByPlatform}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.ordersByPlatform.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    api.get('/orders', {
      params: { status, platform, search, page, limit }
    })
    .then(res => setOrders(res.data))
    .catch(() => {
      alert('Failed to fetch orders. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/';
    });
  }, [status, platform, search, page]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      // Refetch orders after update
      api.get('/orders', {
        params: { status, platform, search }
      })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
    } catch (err) {
      alert('Failed to update order status');
      console.error(err);
    }
  };

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

      <div className="flex gap-2 p-6 items-center">
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Order
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-6 items-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <select
          value={platform}
          onChange={e => setPlatform(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Platforms</option>
          <option value="amazon">Amazon</option>
          <option value="flipkart">Flipkart</option>
          {/* Add more platforms as needed */}
        </select>
      </div>

      <Analytics />
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
              <tr key={o._id} onClick={() => setSelectedOrder(o)} className="cursor-pointer hover:bg-gray-50">
                <td className="p-2 border">{o.orderId}</td>
                <td className="p-2 border">{o.customerName}</td>
                <td className="p-2 border"><PlatformIcon platform={o.platform}/> {o.platform}</td>
                <td className="p-2 border">{o.status}</td>
                <td className="p-2 border space-x-2">
                  <select
                    value={o.status}
                    onChange={e => {
                      e.stopPropagation();
                      updateStatus(o.orderId, e.target.value);
                    }}
                    className="border p-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">Page {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={orders.length < limit}
          >
            Next
          </button>
        </div>
      </div>
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      {showNewModal && (
        <NewOrderModal
          onClose={() => setShowNewModal(false)}
          onCreated={newOrder => setOrders([newOrder, ...orders])}
        />
      )}
    </div>
  );
}

export default Dashboard;
