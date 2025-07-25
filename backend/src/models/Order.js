const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: String,
  customerEmail: String,
  amount: Number,
  platform: String,
  status: { type: String, default: 'placed' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
