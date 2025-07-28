const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');
const { ingestMockOrders } = require('./src/jobs/cronIngest');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/analytics', require('./src/routes/analytics'));

// Cron Job: Simulate order ingestion every 10 min
// cron.schedule('*/10 * * * *', ingestMockOrders);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log('Server running at http://localhost:'+PORT);
    });
  })
  .catch(err => console.error('MongoDB error:', err));

