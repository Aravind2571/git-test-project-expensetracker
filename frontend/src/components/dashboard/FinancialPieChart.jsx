import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#f43f5e"];

const FinancialPieChart = ({ totalIncome, totalExpenses }) => {
  
  const data = [
    { name: "Income", value: totalIncome || 0 },
    { name: "Expenses", value: totalExpenses || 0 },
  ];

  if (!totalIncome && !totalExpenses) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No data to display yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, ""]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FinancialPieChart;
