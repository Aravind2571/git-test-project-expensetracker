import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TransactionItem from "../components/dashboard/TransactionItem";
import AddIncomeModal from "../components/income/AddIncomeModal";
import IncomeBarChart from "../components/income/IncomeBarChart";
import { getIncomeTransactions, deleteTransaction } from "../services/api";
import { MdAdd } from "react-icons/md";

const Income = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchIncome = async () => {
    try {
      const { data } = await getIncomeTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch income", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      fetchIncome();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const totalIncome = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Income</h1>
            <p className="text-gray-500 text-sm mt-1">
              Track all your income sources
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition"
          >
            <MdAdd size={20} />
            Add Income
          </button>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl p-5 mb-6">
          <p className="text-indigo-100 text-sm font-medium">Total Income</p>
          <p className="text-3xl font-bold mt-1">
            ₹{totalIncome.toLocaleString("en-IN")}
          </p>
          <p className="text-indigo-200 text-sm mt-1">
            {transactions.length} transactions
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Income Over Time
          </h2>
          <IncomeBarChart transactions={transactions} />
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            All Income
          </h2>
          {loading ? (
            <p className="text-gray-400 text-sm text-center py-6">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">
              No income added yet. Click "Add Income" to get started.
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
        <AddIncomeModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchIncome}
        />
      )}
    </div>
  );
};

export default Income;
