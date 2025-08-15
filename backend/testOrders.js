// backend/testOrders.js
import admin from './config/firebaseAdmin.js';

// Add the UIDs you want to test here
const TEST_USER_UIDS = [
  'anish', // Example UID
  // Add more if needed
];

async function fetchOrdersForUser(uid) {
  const snapshot = await admin.firestore()
    .collection('orders')
    .where('userId', '==', uid)
    .get();

  if (snapshot.empty) {
    console.log(`❌ No orders found for UID: ${uid}`);
    return;
  }

  console.log(`\n✅ Orders for UID: ${uid}`);
  snapshot.forEach(doc => {
    console.log(JSON.stringify({ id: doc.id, ...doc.data() }, null, 2));
  });
}

(async () => {
  for (const uid of TEST_USER_UIDS) {
    await fetchOrdersForUser(uid);
  }
})();
