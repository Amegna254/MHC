import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  uploads: number;
  likes: number;
  views: number;
}

function PerformanceChart({
  uploads,
  likes,
  views,
}: Props) {
  const data = [
    {
      name: "Uploads",
      value: uploads,
    },
    {
      name: "Likes",
      value: likes,
    },
    {
      name: "Views",
      value: views,
    },
  ];

  return (
    <div className="rounded-3xl bg-slate-900 p-6">
      <h2 className="text-xl font-semibold mb-6">
        Performance Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;