import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import SummaryCard from "../components/dashboard/SummaryCard";
import TransactionItem from "../components/dashboard/TransactionItem";
import FinancialPieChart from "../components/dashboard/FinancialPieChart";
import { getAnalyticsSummary } from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSummary = async () => {
    try {
      const { data } = await getAnalyticsSummary();
      setSummary(data);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Your financial overview</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Loading dashboard...
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <SummaryCard
                title="Total Balance"
                amount={summary?.totalBalance}
                icon="💳"
                color="text-indigo-600"
                bgColor="bg-indigo-50"
              />
              <SummaryCard
                title="Total Income"
                amount={summary?.totalIncome}
                icon="📈"
                color="text-green-600"
                bgColor="bg-green-50"
              />
              <SummaryCard
                title="Total Expenses"
                amount={summary?.totalExpenses}
                icon="📉"
                color="text-red-500"
                bgColor="bg-red-50"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Financial Overview</h2>
                <FinancialPieChart
                  totalIncome={summary?.totalIncome}
                  totalExpenses={summary?.totalExpenses}
                />
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-800">Recent Transactions</h2>
                  <button
                    onClick={() => navigate("/expenses")}
                    className="text-indigo-500 text-sm font-medium hover:underline"
                  >
                    See All
                  </button>
                </div>
                {summary?.recentTransactions?.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4 text-center">No transactions yet</p>
                ) : (
                  summary?.recentTransactions?.map((t) => (
                    <TransactionItem key={t._id} transaction={t} />
                  ))
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-800">Recent Income</h2>
                  <button
                    onClick={() => navigate("/income")}
                    className="text-indigo-500 text-sm font-medium hover:underline"
                  >
                    See All
                  </button>
                </div>
                {summary?.recentIncome?.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4 text-center">No income added yet</p>
                ) : (
                  summary?.recentIncome?.map((t) => (
                    <TransactionItem key={t._id} transaction={t} />
                  ))
                )}
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-800">Recent Expenses</h2>
                  <button
                    onClick={() => navigate("/expenses")}
                    className="text-indigo-500 text-sm font-medium hover:underline"
                  >
                    See All
                  </button>
                </div>
                {summary?.recentExpenses?.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4 text-center">No expenses added yet</p>
                ) : (
                  summary?.recentExpenses?.map((t) => (
                    <TransactionItem key={t._id} transaction={t} />
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
