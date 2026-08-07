import { useEffect, useState } from "react";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DashboardStats from "../components/dashboard/DashboardStats";
import PerformanceSection from "../components/dashboard/PerformanceSection";
import RecentUploads from "../components/dashboard/RecentUploads";
import MarketplacePreview from "../components/dashboard/MarketplacePreview";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";
import { useMarketplace } from "../context/MarketplaceContext";

import {
  FaChartLine,
  FaArrowTrendUp,
} from "react-icons/fa6";

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

  performance: {
    totalViews: number;
    totalLikes: number;
  };

  recentUploads: any[];
}

function Dashboard() {
  const { marketplaceItems } = useMarketplace();

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 overflow-x-hidden">

        <div className="px-10 py-8">

          <Topbar />

          {/* ========================= */}
          {/* DASHBOARD HEADER */}
          {/* ========================= */}

          <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-5xl font-black tracking-tight">

                Creator Dashboard

              </h1>

              <p className="mt-3 text-slate-400 text-lg">

                Welcome back,

                <span className="font-semibold text-cyan-400">

                  {" "}
                  {dashboard?.user.fullName}

                </span>

                . Here's how your creator business is performing.

              </p>

            </div>

            <div className="mt-8 lg:mt-0">

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-4">

                <div className="flex items-center gap-3">

                  <FaChartLine className="text-2xl text-cyan-400" />

                  <div>

                    <p className="text-sm text-slate-400">
                      Growth Status
                    </p>

                    <h3 className="font-bold text-cyan-300 flex items-center gap-2">

                      Growing

                      <FaArrowTrendUp />

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ========================= */}
          {/* STATS */}
          {/* ========================= */}

          <div className="mt-8">

            <DashboardStats
              images={dashboard?.stats.images ?? 0}
              videos={dashboard?.stats.videos ?? 0}
              audio={dashboard?.stats.audio ?? 0}
              documents={dashboard?.stats.documents ?? 0}
            />

          </div>

          {/* ========================= */}
          {/* PERFORMANCE + RECENT */}
          {/* ========================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

            <div className="xl:col-span-2">

              <PerformanceSection
                uploads={dashboard?.stats.totalUploads ?? 0}
                likes={dashboard?.performance.totalLikes ?? 0}
                views={dashboard?.performance.totalViews ?? 0}
              />

            </div>

            <RecentUploads
              uploads={dashboard?.recentUploads ?? []}
              dashboard={dashboard}
              setDashboard={setDashboard}
            />

          </div>

          {/* ========================= */}
          {/* MARKETPLACE */}
          {/* ========================= */}

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">

  <div className="xl:col-span-2">

    <MarketplacePreview
      marketplaceItems={marketplaceItems}
    />

  </div>

  <Link
  to="/my-purchases"
  className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400 transition"
>
  My Purchases
</Link>

  <div className="space-y-8">

    <QuickActions />

    <RecentActivity />

  </div>

</div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;