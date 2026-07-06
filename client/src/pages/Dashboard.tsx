import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentUploads from "../components/dashboard/RecentUploads";
import { getDashboard } from "../services/dashboardService";

interface DashboardData {
  user: {
    id: number;
    fullName: string;
    username: string;
    email: string;
  };
  stats: {
    totalUploads: number;
    images: number;
    videos: number;
    audio: number;
    documents: number;
  };
  recentUploads: any[];
}

function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        console.log("Dashboard:", data);
        setDashboard(data);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">

        <Topbar />

        <div className="mt-8 mb-10">
  <h1 className="text-4xl font-bold">
    Dashboard Overview
  </h1>

  <p className="text-slate-400 mt-3 text-lg">
    Welcome back,
    <span className="text-cyan-400 font-semibold">
      {" "}{dashboard?.user.fullName}
    </span>
  </p>

  <p className="text-slate-500 mt-2">
    Manage your uploads and monitor your activity.
  </p>
</div>
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <StatCard
            title="Images"
            value={dashboard?.stats.images ?? 0}
          />

          <StatCard
            title="Videos"
            value={dashboard?.stats.videos ?? 0}
          />

          <StatCard
            title="Audio"
            value={dashboard?.stats.audio ?? 0}
          />

          <StatCard
            title="Documents"
            value={dashboard?.stats.documents ?? 0}
          />

        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <QuickActions />
        </div>

        {/* Recent Uploads */}
        <div className="mt-10">
          <RecentUploads uploads={dashboard?.recentUploads ?? []} />
        </div>

      </main>

    </div>
  );
}

export default Dashboard;