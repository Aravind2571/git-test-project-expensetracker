const Transaction = require("../models/Transaction");

// @desc    Get financial summary/analytics for the user
// @route   GET /api/analytics/summary
// @access  Private
const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all transactions for this user
    const allTransactions = await Transaction.find({ userId }).sort({ date: -1 });

    // Separate income and expenses
    const incomeTransactions = allTransactions.filter((t) => t.type === "income");
    const expenseTransactions = allTransactions.filter((t) => t.type === "expense");

    // Calculate totals by summing amounts
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    // Return last 5 of each for the dashboard recent sections
    const recentTransactions = allTransactions.slice(0, 5);
    const recentIncome = incomeTransactions.slice(0, 5);
    const recentExpenses = expenseTransactions.slice(0, 5);

    res.json({
      totalBalance,
      totalIncome,
      totalExpenses,
      recentTransactions,
      recentIncome,
      recentExpenses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSummary };
