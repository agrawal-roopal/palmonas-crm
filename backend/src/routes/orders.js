const router = require('express').Router();
const Order = require('../models/Order');
const { auth, roleCheck } = require('../middlewares/auth');

router.get("/", async (req, res) => {
    const { status, platform, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (platform) query.platform = platform;
    if (search) query.customerName = { $regex: search, $options: "i" };

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Failed to create order" });
    }
});

router.patch('/:id/status', auth, roleCheck('admin', 'support'), async (req, res) => {
  const { status } = req.body;
  const order = await Order.findOneAndUpdate({ orderId: req.params.id }, { status }, { new: true });
  res.json(order);
});

module.exports = router;
