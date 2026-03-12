const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware — allow JSON requests and cross-origin requests from React frontend
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes — all API endpoints grouped by feature
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
