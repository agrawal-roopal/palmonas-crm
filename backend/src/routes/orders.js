const router = require('express').Router();
const Order = require('../models/Order');
const { auth, roleCheck } = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const filters = req.query;
  const orders = await Order.find(filters).sort({ createdAt: -1 });
  res.json(orders);
});

router.patch('/:id/status', auth, roleCheck('admin', 'support'), async (req, res) => {
  const { status } = req.body;
  const order = await Order.findOneAndUpdate({ orderId: req.params.id }, { status }, { new: true });
  res.json(order);
});

module.exports = router;
