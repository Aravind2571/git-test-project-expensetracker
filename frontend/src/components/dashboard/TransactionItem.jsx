import moment from "moment";
import { MdDelete } from "react-icons/md";
const TransactionItem = ({ transaction, onDelete, showDelete = false }) => {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl">
          {transaction.emoji}
        </div>
        <div>
          <p className="font-medium text-gray-800 text-sm">{transaction.category}</p>
          <p className="text-gray-400 text-xs">
            {transaction.description || transaction.source || "—"} •{" "}
            {moment(transaction.date).format("DD MMM YYYY")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
    
        <span
          className={`font-semibold text-sm ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}₹{transaction.amount?.toLocaleString("en-IN")}
        </span>
        {showDelete && (
          <button
            onClick={() => onDelete(transaction._id)}
            className="text-gray-300 hover:text-red-400 transition"
          >
            <MdDelete size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
