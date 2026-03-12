const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getIncomeTransactions,
  getExpenseTransactions,
} = require("../controllers/transactionController");

// All routes below are protected — must send JWT token in header

// GET /api/transactions — Get all transactions
router.get("/", protect, getAllTransactions);

// POST /api/transactions/add — Add new transaction
router.post("/add", protect, addTransaction);

// GET /api/transactions/income — Get only income
router.get("/income", protect, getIncomeTransactions);

// GET /api/transactions/expense — Get only expenses
router.get("/expense", protect, getExpenseTransactions);

// DELETE /api/transactions/:id — Delete a transaction by ID
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
