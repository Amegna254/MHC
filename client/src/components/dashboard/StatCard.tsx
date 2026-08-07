import { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  trend?: string;
  icon: ReactNode;
  color:
    | "cyan"
    | "green"
    | "pink"
    | "yellow"
    | "purple";
}

const colors = {
  cyan: {
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
    bar: "bg-cyan-400",
    border: "hover:border-cyan-500",
  },

  green: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    bar: "bg-green-400",
    border: "hover:border-green-500",
  },

  pink: {
    bg: "bg-pink-500/20",
    text: "text-pink-400",
    bar: "bg-pink-400",
    border: "hover:border-pink-500",
  },

  yellow: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    bar: "bg-yellow-400",
    border: "hover:border-yellow-500",
  },

  purple: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    bar: "bg-purple-400",
    border: "hover:border-purple-500",
  },
};

function StatCard({
  title,
  value,
  trend,
  icon,
  color,
}: Props) {
  const c = colors[color];

  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 ${c.border} hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

          {trend && (
            <p className="mt-4 text-sm text-green-400">
              ↑ {trend}
            </p>
          )}

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${c.bg} ${c.text}`}
        >
          {icon}
        </div>

      </div>

      <div className="mt-6 h-2 rounded-full bg-slate-800 overflow-hidden">

        <div
          className={`h-full rounded-full ${c.bar}`}
          style={{
            width: `${Math.min(
              typeof value === "number" ? value : 80,
              100
            )}%`,
          }}
        />

      </div>

    </div>
  );
}

export default StatCard;