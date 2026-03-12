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

router.get("/", protect, getAllTransactions);
router.post("/add", protect, addTransaction);
router.get("/income", protect, getIncomeTransactions);
router.get("/expense", protect, getExpenseTransactions);

router.delete("/:id", protect, deleteTransaction);

module.exports = router;
