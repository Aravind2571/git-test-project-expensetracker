const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  const { type, category, source, amount, emoji, description, date } = req.body;

  try {
    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const transaction = await Transaction.create({
      userId: req.user._id, 
      type,
      category,
      source: source || "",
      amount,
      emoji: emoji || "💰",
      description: description || "",
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIncomeTransactions = async (req, res) => {
  try {
    const income = await Transaction.find({
      userId: req.user._id,
      type: "income",
    }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getExpenseTransactions = async (req, res) => {
  try {
    const expenses = await Transaction.find({
      userId: req.user._id,
      type: "expense",
    }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getIncomeTransactions,
  getExpenseTransactions,
};
