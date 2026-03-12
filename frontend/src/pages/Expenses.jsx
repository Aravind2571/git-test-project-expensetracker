import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TransactionItem from "../components/dashboard/TransactionItem";
import AddExpenseModal from "../components/expense/AddExpenseModal";
import { getExpenseTransactions, deleteTransaction } from "../services/api";
import { MdAdd } from "react-icons/md";
import ExpenseBarChart from "../components/expense/ExpenseBarChart";

const Expenses = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchExpenses = async () => {
    try {
      const { data } = await getExpenseTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const categoryBreakdown = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor where your money goes</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition"
          >
            <MdAdd size={20} />
            Add Expense
          </button>
        </div>
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl p-5 mb-6">
          <p className="text-rose-100 text-sm font-medium">Total Expenses</p>
          <p className="text-3xl font-bold mt-1">₹{totalExpenses.toLocaleString("en-IN")}</p>
          <p className="text-rose-200 text-sm mt-1">{transactions.length} transactions</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Expenses Over Time</h2>
          <ExpenseBarChart transactions={transactions} />
        </div>
        {Object.keys(categoryBreakdown).length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Spending by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(categoryBreakdown)
                .sort((a, b) => b[1] - a[1]) 
                .map(([category, amount]) => (
                  <div key={category} className="bg-rose-50 rounded-xl p-3">
                    <p className="text-sm font-medium text-gray-700">{category}</p>
                    <p className="text-rose-600 font-bold text-sm mt-1">
                      ₹{amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">All Expenses</h2>
          {loading ? (
            <p className="text-gray-400 text-sm text-center py-6">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">
              No expenses added yet. Click "Add Expense" to get started.
            </p>
          ) : (
            transactions.map((t) => (
              <TransactionItem
                key={t._id}
                transaction={t}
                onDelete={handleDelete}
                showDelete={true}
              />
            ))
          )}
        </div>
      </main>

      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchExpenses}
        />
      )}
    </div>
  );
};

export default Expenses;
