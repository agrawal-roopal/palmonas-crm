const connectDB = require('../src/config/db');
const { ingestMockOrders } = require('../src/jobs/cronIngest');

(async () => {
  await connectDB();
  await ingestMockOrders();
  process.exit(0);
})();
