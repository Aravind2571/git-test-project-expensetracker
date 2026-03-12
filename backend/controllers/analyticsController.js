const Transaction = require("../models/Transaction");
const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    
    const allTransactions = await Transaction.find({ userId }).sort({ date: -1 });

    
    const incomeTransactions = allTransactions.filter((t) => t.type === "income");
    const expenseTransactions = allTransactions.filter((t) => t.type === "expense");

   
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;
    
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
