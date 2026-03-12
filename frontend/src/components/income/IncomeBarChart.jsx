import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";

const IncomeBarChart = ({ transactions }) => {
  const dataMap = {};
  transactions.forEach((t) => {
    const day = moment(t.date).format("DD MMM");
    dataMap[day] = (dataMap[day] || 0) + t.amount;
  });
  const data = Object.entries(dataMap).map(([date, amount]) => ({ date, amount }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No income data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Income"]} />
        <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeBarChart;
