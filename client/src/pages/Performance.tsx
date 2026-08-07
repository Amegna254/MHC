import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getDashboard } from "../services/dashboardService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
  FaImages,
  FaEye,
  FaHeart,
  FaCommentDots,
  FaChartLine,
  FaArrowUp,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function Performance() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboard = await getDashboard();
        setData(dashboard);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading Performance...
      </div>
    );
  }

  const labels =
    data?.recentUploads?.map((item: any) =>
      item.title.length > 18
        ? item.title.substring(0, 18) + "..."
        : item.title
    ) || [];

  const chartData = {
    labels,

    datasets: [
      {
        label: "Views",
        data:
          data?.recentUploads?.map(
            (item: any) => item.views ?? 0
          ) || [],

        borderColor: "#06b6d4",
        backgroundColor: "rgba(6,182,212,.15)",
        fill: true,
        tension: .4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },

      {
        label: "Likes",

        data:
          data?.recentUploads?.map(
            (item: any) => item.likes ?? 0
          ) || [],

        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139,92,246,.15)",
        fill: true,
        tension: .4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
        },

        grid: {
          color: "#1e293b",
        },
      },

      y: {
        ticks: {
          color: "#94a3b8",
        },

        grid: {
          color: "#1e293b",
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        {/* HEADER */}

        <div className="mt-8 flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-bold">
              Performance Dashboard
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Track your creator growth, audience engagement,
              and marketplace performance.
            </p>

          </div>

          <div className="hidden lg:flex items-center gap-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 px-6 py-4">

            <FaArrowUp className="text-cyan-400 text-2xl"/>

            <div>

              <p className="text-sm text-slate-400">
                Engagement Rate
              </p>

              <h2 className="text-3xl font-bold text-cyan-400">

                {data.performance.totalViews > 0
                  ? (
                      (data.performance.totalLikes /
                        data.performance.totalViews) *
                      100
                    ).toFixed(1)
                  : "0"}

                %

              </h2>

            </div>

          </div>

        </div>
              {/* ======================= */}
        {/* KPI CARDS */}
        {/* ======================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-10">

          {/* Uploads */}

          <div className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-300 p-6">

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <FaImages className="text-cyan-400 text-2xl" />
            </div>

            <p className="text-slate-400 mt-6">
              Total Uploads
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {data.stats.totalUploads}
            </h2>

            <p className="text-green-400 text-sm mt-4">
              Creator Library
            </p>

          </div>

          {/* Views */}

          <div className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-green-500 transition-all duration-300 p-6">

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <FaEye className="text-green-400 text-2xl" />
            </div>

            <p className="text-slate-400 mt-6">
              Total Views
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {data.performance.totalViews}
            </h2>

            <p className="text-green-400 text-sm mt-4">
              Audience Reach
            </p>

          </div>

          {/* Likes */}

          <div className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-pink-500 transition-all duration-300 p-6">

            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center">
              <FaHeart className="text-pink-400 text-2xl" />
            </div>

            <p className="text-slate-400 mt-6">
              Total Likes
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {data.performance.totalLikes}
            </h2>

            <p className="text-pink-400 text-sm mt-4">
              Community Support
            </p>

          </div>

          {/* Comments */}

          <div className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-yellow-500 transition-all duration-300 p-6">

            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
              <FaCommentDots className="text-yellow-400 text-2xl" />
            </div>

            <p className="text-slate-400 mt-6">
              Comments
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {data.performance.totalComments ?? 0}
            </h2>

            <p className="text-yellow-400 text-sm mt-4">
              Discussions
            </p>

          </div>

          {/* Engagement */}

          <div className="rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 p-6 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaChartLine className="text-white text-2xl" />
            </div>

            <p className="text-cyan-100 mt-6">
              Engagement
            </p>

            <h2 className="text-4xl font-bold mt-2">

              {data.performance.totalViews > 0
                ? (
                    (data.performance.totalLikes /
                      data.performance.totalViews) *
                    100
                  ).toFixed(1)
                : "0"}

              %

            </h2>

            <p className="text-cyan-100 text-sm mt-4">
              Overall Creator Score
            </p>

          </div>

        </div>
{/* ======================= */}
{/* FEATURED UPLOAD */}
{/* ======================= */}

<div className="mt-10 rounded-3xl bg-gradient-to-r from-cyan-900 via-slate-900 to-slate-900 border border-cyan-700 p-8">

  <div className="flex items-center justify-between mb-8">

    <div>

      <p className="text-cyan-400 font-semibold uppercase tracking-widest">
        Featured Upload
      </p>

      <h2 className="text-3xl font-bold mt-2">
        Your Best Performing Content
      </h2>

    </div>

    <span className="rounded-full bg-yellow-500 text-black px-4 py-2 font-bold">
      ⭐ Top Performer
    </span>

  </div>

  {data.recentUploads?.length ? (

    (() => {

      const best = [...data.recentUploads].sort(
        (a: any, b: any) => (b.views ?? 0) - (a.views ?? 0)
      )[0];

      return (

        <div className="grid lg:grid-cols-2 gap-8">

          <div>

            {best.fileType === "image" ? (

              <img
                src={`http://localhost:5000/uploads/${best.fileName}`}
                alt={best.title}
                className="w-full h-80 object-cover rounded-3xl"
              />

            ) : (

              <div className="h-80 rounded-3xl bg-slate-800 flex items-center justify-center text-7xl">

                {best.fileType === "video" && "🎥"}
                {best.fileType === "audio" && "🎵"}
                {best.fileType === "document" && "📄"}

              </div>

            )}

          </div>

          <div className="flex flex-col justify-center">

            <h2 className="text-4xl font-bold">
              {best.title}
            </h2>

            <p className="text-slate-400 mt-4 leading-8">
              {best.description || "No description available."}
            </p>

            <div className="grid grid-cols-2 gap-5 mt-8">

              <div className="rounded-2xl bg-slate-950 p-5">

                <p className="text-slate-500">
                  Views
                </p>

                <h3 className="text-3xl font-bold text-cyan-400">
                  {best.views ?? 0}
                </h3>

              </div>

              <div className="rounded-2xl bg-slate-950 p-5">

                <p className="text-slate-500">
                  Likes
                </p>

                <h3 className="text-3xl font-bold text-pink-400">
                  {best.likes ?? 0}
                </h3>

              </div>

            </div>

          </div>

        </div>

      );

    })()

  ) : (

    <div className="text-slate-400">
      No uploads available.
    </div>

  )}

</div>

{/* ======================= */}
{/* PERFORMANCE CHART */}
{/* ======================= */}

<div className="mt-10 rounded-3xl bg-slate-900 border border-slate-800 p-8">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

    <div>

      <h2 className="text-3xl font-bold">
        Performance Trend
      </h2>

      <p className="text-slate-400 mt-2">
        Views and likes across your recent uploads.
      </p>

    </div>

    <div className="mt-6 lg:mt-0 flex gap-3">

      <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-400 text-sm">
        🔵 Views
      </span>

      <span className="rounded-full bg-purple-500/20 px-4 py-2 text-purple-400 text-sm">
        🟣 Likes
      </span>

    </div>

  </div>

  {/* ADD THE FILTER BUTTONS HERE */}

  <div className="flex flex-wrap gap-3 mt-8">

    <button className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black">
      All Time
    </button>

    <button className="rounded-xl border border-slate-700 px-5 py-2 hover:border-cyan-500">
      Today
    </button>

    <button className="rounded-xl border border-slate-700 px-5 py-2 hover:border-cyan-500">
      7 Days
    </button>

    <button className="rounded-xl border border-slate-700 px-5 py-2 hover:border-cyan-500">
      30 Days
    </button>

    <button className="rounded-xl border border-slate-700 px-5 py-2 hover:border-cyan-500">
      This Year
    </button>

  </div>

  {/* GRAPH */}

  <div className="mt-10 h-[420px]">

    <Line
      data={chartData}
      options={chartOptions}
    />

  </div>

</div>

        {/* ======================= */}
        {/* SECOND ROW */}
        {/* ======================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

          {/* TOP UPLOADS */}

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-2xl font-bold">
                Top Performing Uploads
              </h2>

              <span className="text-cyan-400">
                Top 5
              </span>

            </div>

            {data.recentUploads
              ?.sort(
                (a: any, b: any) =>
                  (b.views ?? 0) - (a.views ?? 0)
              )
              .slice(0, 5)
              .map((item: any, index: number) => (

                <div
                  key={item.id}
                  className="mb-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500 transition p-5"
                >

                  <div className="flex justify-between">

                    <div>

                      <div className="text-cyan-400 text-sm">

                        #{index + 1}

                      </div>

                      <h3 className="font-semibold text-lg mt-1">
                        {item.title}
                      </h3>

                      <p className="text-slate-500 mt-1">
                        {item.fileType}
                      </p>

                    </div>

                    <div className="text-right">

                      <div className="text-cyan-400 font-bold">
                        {item.views ?? 0}
                      </div>

                      <div className="text-slate-400 text-sm">
                        Views
                      </div>

                      <div className="mt-3 text-pink-400 font-semibold">
                        ❤️ {item.likes ?? 0}
                      </div>

                    </div>

                  </div>

                </div>

              ))}

          </div>
                   {/* UPLOAD BREAKDOWN */}

          <div className="space-y-8">

            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

              <h2 className="text-2xl font-bold mb-8">
                Upload Breakdown
              </h2>

              {/* Images */}

              <div className="mb-6">

                <div className="flex justify-between mb-2">

                  <span>Images</span>

                  <span className="text-cyan-400 font-bold">
                    {data.stats.images}
                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{
                      width: `${
                        data.stats.totalUploads
                          ? (data.stats.images /
                              data.stats.totalUploads) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* Videos */}

              <div className="mb-6">

                <div className="flex justify-between mb-2">

                  <span>Videos</span>

                  <span className="text-red-400 font-bold">
                    {data.stats.videos}
                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${
                        data.stats.totalUploads
                          ? (data.stats.videos /
                              data.stats.totalUploads) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* Audio */}

              <div className="mb-6">

                <div className="flex justify-between mb-2">

                  <span>Audio</span>

                  <span className="text-green-400 font-bold">
                    {data.stats.audio}
                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${
                        data.stats.totalUploads
                          ? (data.stats.audio /
                              data.stats.totalUploads) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* Documents */}

              <div>

                <div className="flex justify-between mb-2">

                  <span>Documents</span>

                  <span className="text-yellow-400 font-bold">
                    {data.stats.documents}
                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{
                      width: `${
                        data.stats.totalUploads
                          ? (data.stats.documents /
                              data.stats.totalUploads) *
                            100
                          : 0
                      }%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* Creator Insights */}

            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8">

              <h2 className="text-2xl font-bold mb-6">
                Creator Insights
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-slate-400">
                    Average Views / Upload
                  </span>

                  <span className="font-semibold text-cyan-400">

                    {data.stats.totalUploads > 0
                      ? (
                          data.performance.totalViews /
                          data.stats.totalUploads
                        ).toFixed(1)
                      : 0}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400">
                    Average Likes / Upload
                  </span>

                  <span className="font-semibold text-pink-400">

                    {data.stats.totalUploads > 0
                      ? (
                          data.performance.totalLikes /
                          data.stats.totalUploads
                        ).toFixed(1)
                      : 0}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400">
                    Engagement Rate
                  </span>

                  <span className="font-semibold text-green-400">

                    {data.performance.totalViews > 0
                      ? (
                          (data.performance.totalLikes /
                            data.performance.totalViews) *
                          100
                        ).toFixed(1)
                      : 0}

                    %

                  </span>

                </div>

              </div>

              <div className="mt-8 rounded-2xl bg-slate-950 border border-slate-800 p-6">

                <h3 className="font-semibold text-lg mb-3">
                  Recommendation
                </h3>

                <p className="text-slate-400 leading-7">

                  {data.performance.totalViews === 0
                    ? "Upload more content to begin building your audience and tracking performance."

                    : data.performance.totalLikes >
                      data.performance.totalViews * 0.30

                    ? "Excellent engagement. Your audience is actively interacting with your uploads. Continue publishing consistently."

                    : data.performance.totalLikes >
                      data.performance.totalViews * 0.15

                    ? "Good engagement. Regular uploads and attractive thumbnails can help increase your reach."

                    : "Your uploads are receiving views but fewer interactions. Consider improving titles, descriptions, thumbnails, and sharing your work more widely."}

                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}
