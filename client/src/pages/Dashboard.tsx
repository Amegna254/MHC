import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import { getDashboard } from "../services/dashboardService";
import { useMarketplace } from "../context/MarketplaceContext";

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
  const { marketplaceItems } = useMarketplace();
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

        <div className="mt-4 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">{dashboard?.user.fullName}</p>
          </div>
          <a
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
          >
            Browse Marketplace
          </a>
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

        {/* Minimal dashboard: hide quick actions and recent uploads for clarity */}

        <section className="mt-12 rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Recent Marketplace Listings</h2>
              <p className="text-slate-400">Your latest marketplace uploads and created items.</p>
            </div>
            <div className="text-sm text-slate-400">
              {marketplaceItems.length} total listings
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {marketplaceItems.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{item.category}</span>
                  <span>❤️ {item.likes}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-400">{item.creator}</p>
                <div className="mt-4 flex items-center justify-between text-white">
                  <span className="font-semibold">{item.price}</span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                    {item.rating.toFixed(1)} ⭐
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}

export default Dashboard;