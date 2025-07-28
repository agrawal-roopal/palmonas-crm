const router = require('express').Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const ordersByPlatform = await Order.aggregate([
      { $group: { _id: "$platform", count: { $sum: 1 } } }
    ]);

    res.json({ totalOrders, ordersByStatus, ordersByPlatform });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router; 