import { useState } from "react";
import { addTransaction } from "../../services/api";
import { MdClose } from "react-icons/md";

const EMOJIS = ["🛒", "🍔", "🚗", "🏠", "💊", "🎮", "✈️", "👕", "📱", "🎬"];
const EXPENSE_CATEGORIES = ["Food", "Transport", "Shopping", "Housing", "Health", "Entertainment", "Travel", "Education", "Utilities", "Other"];

const AddExpenseModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    description: "",
    emoji: "🛒",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.amount || formData.amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      await addTransaction({ ...formData, type: "expense" });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Add Expense</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <MdClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pick an Emoji</label>
            <div className="flex gap-2 flex-wrap">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, emoji })}
                  className={`text-xl p-1.5 rounded-lg border-2 transition ${
                    formData.emoji === emoji ? "border-rose-400 bg-rose-50" : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What did you spend on?"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
