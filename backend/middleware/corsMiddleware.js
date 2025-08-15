// backend/middleware/corsMiddleware.js
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // frontend port
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

module.exports = cors(corsOptions);
