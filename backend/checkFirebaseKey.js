// checkFirebaseKey.js
console.log(process.env.FIREBASE_SERVICE_ACCOUNT);
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
console.log(serviceAccount.private_key);
