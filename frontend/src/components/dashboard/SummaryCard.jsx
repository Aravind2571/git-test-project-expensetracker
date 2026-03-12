// Reusable card component for displaying balance/income/expense summaries
const SummaryCard = ({ title, amount, icon, color, bgColor }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>
          ₹{amount?.toLocaleString("en-IN") || "0"}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
