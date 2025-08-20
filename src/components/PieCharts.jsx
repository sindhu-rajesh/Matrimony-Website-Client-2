import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#FF6B6B", // Total Biodata - Coral Red
  "#2ECC71", // Male Biodata - Emerald Green
  "#F1C40F", // Female Biodata - Sunflower Yellow
  "#8E44AD", // Premium Biodata - Deep Purple
  "#118ab2",
];

const PieCharts = ({ stats }) => {
  const data = [
    {
      name: "Total Biodata",
      value: stats.totalBiodata || 0,
    },
    {
      name: "Male Biodata",
      value: stats.maleCount || 0,
    },
    {
      name: "Female Biodata",
      value: stats.femaleCount || 0,
    },
    {
      name: "Premium Biodata",
      value: stats.premiumCount || 0,
    },
    {
      name: "Total Revenue (USD)",
      value: stats.totalRevenue || 0,
    },
  ];

  return (
    <div className="bg-white p-6 shadow rounded-lg mt-10 w-full lg:w-1/2 mx-auto">
      <h3 className="text-xl font-semibold text-center mb-4">
        Biodata Distribution Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;
