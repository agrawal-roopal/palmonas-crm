const fs = require('fs');
const path = require('path');
const Order = require('../models/Order');

const SOURCES = ['amazon', 'blinkit', 'website'];
const MOCK_DIR = path.join(__dirname, '../../mockSources');

async function ingestMockOrders() {
  for (const source of SOURCES) {
    const file = path.join(MOCK_DIR, `${source}.json`);
    if (!fs.existsSync(file)) {
      console.warn(`⚠️ File not found: ${file}`);
      continue;
    }

    const raw = fs.readFileSync(file, 'utf8');
    if (!raw.trim()) continue;

    const orders = JSON.parse(raw);
    const formatted = orders.map(order => ({
      ...order,
      platform: source,
      status: 'placed'
    }));

    await Order.insertMany(formatted, { ordered: false })
    .then(() => {
        console.log(`✅ Ingested ${formatted.length} orders from ${source}`);
    })
    .catch((err) => {
        console.error(`❌ Failed to insert orders from ${source}:`, err.message);
    });

    console.log(`✅ Ingested ${formatted.length} orders from ${source}`);
  }
}

module.exports = { ingestMockOrders };