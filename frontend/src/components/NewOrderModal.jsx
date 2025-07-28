import React, { useState } from 'react';
import axios from 'axios';

function NewOrderModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ orderId: "", customerName: "", platform: "", status: "pending" });

  const submit = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders`, form)
         .then(res => { onCreated(res.data); onClose(); });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h3 className="text-lg font-bold mb-4">Add New Order</h3>
        <input placeholder="Order ID" value={form.orderId} onChange={e => setForm({...form, orderId: e.target.value})} className="border p-2 w-full mb-2"/>
        <input placeholder="Customer Name" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} className="border p-2 w-full mb-2"/>
        <input placeholder="Platform" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})} className="border p-2 w-full mb-2"/>
        <button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
      </div>
    </div>
  );
}

export default NewOrderModal;