import { Link } from "react-router-dom";
import {
  FaUpload,
  FaStore,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";

function ActionCard({
  icon,
  title,
  to,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  to: string;
  color: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500 p-4 transition-all hover:-translate-y-1"
    >
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${color}`}
      >
        {icon}
      </div>

      <span className="font-semibold">
        {title}
      </span>
    </Link>
  );
}

export default function QuickActions() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">

        <ActionCard
          title="Upload Media"
          to="/upload"
          icon={<FaUpload />}
          color="bg-cyan-500/20 text-cyan-400"
        />

        <ActionCard
          title="Marketplace"
          to="/marketplace"
          icon={<FaStore />}
          color="bg-green-500/20 text-green-400"
        />

        <ActionCard
          title="Performance"
          to="/performance"
          icon={<FaChartLine />}
          color="bg-purple-500/20 text-purple-400"
        />

        <ActionCard
          title="Profile"
          to="/profile"
          icon={<FaUserCircle />}
          color="bg-yellow-500/20 text-yellow-400"
        />

      </div>

    </div>
  );
}