import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getDashboard } from "../services/dashboardService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Performance() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDashboard();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading performance...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar />

        <div className="mt-6 max-w-4xl mx-auto space-y-6">
          <div className="rounded-3xl bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold">Performance Overview</h2>
            <p className="text-slate-400 mt-2">Quick summary of your marketplace performance.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-950/40 p-4 text-center">
                <div className="text-sm text-slate-400">Total Views</div>
                <div className="text-2xl font-semibold">{data.performance?.totalViews ?? 0}</div>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4 text-center">
                <div className="text-sm text-slate-400">Total Likes</div>
                <div className="text-2xl font-semibold">{data.performance?.totalLikes ?? 0}</div>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4 text-center">
                <div className="text-sm text-slate-400">Total Uploads</div>
                <div className="text-2xl font-semibold">{data.stats?.totalUploads ?? 0}</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">Recent Uploads</h3>
            <div className="mt-4">
              {data.recentUploads?.length ? (
                (() => {
                  const labels = data.recentUploads.map((u: any) => u.title.slice(0, 20));
                  const views = data.recentUploads.map((u: any) => u.views || 0);
                  const likes = data.recentUploads.map((u: any) => u.likes || 0);

                  const chartData = {
                    labels,
                    datasets: [
                      {
                        label: 'Views',
                        data: views,
                        backgroundColor: 'rgba(34,197,94,0.8)'
                      },
                      {
                        label: 'Likes',
                        data: likes,
                        backgroundColor: 'rgba(6,182,212,0.8)'
                      }
                    ]
                  };

                  const options = {
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' as const },
                      title: { display: false }
                    }
                  };

                  return <Bar data={chartData} options={options} />;
                })()
              ) : (
                <div className="text-slate-400">No recent uploads</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
