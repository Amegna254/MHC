import PerformanceChart from "./PerformanceChart";
import CreatorStats from "./CreatorStats";
import {
  FaChartLine,
  FaArrowTrendUp,
  FaEye,
  FaHeart,
} from "react-icons/fa6";

interface Props {
  uploads: number;
  likes: number;
  views: number;
}

function PerformanceSection({
  uploads,
  likes,
  views,
}: Props) {
  return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* Left Panel */}

      <div className="xl:col-span-2 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">

          <div>

            <h2 className="flex items-center gap-3 text-2xl font-bold">

              <FaChartLine className="text-cyan-400" />

              Performance Overview

            </h2>

            <p className="text-slate-400 mt-2">
              Track your creator growth and engagement.
            </p>

          </div>

          <button className="rounded-xl bg-slate-800 px-5 py-2 hover:bg-slate-700 transition">
            Last 30 Days
          </button>

        </div>

        {/* Analytics Summary */}

        <div className="grid grid-cols-3 gap-6 px-8 py-6 border-b border-slate-800">

          <div>

            <p className="text-slate-400 text-sm">
              Uploads
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {uploads}
            </h3>

          </div>

          <div>

            <p className="flex items-center gap-2 text-slate-400 text-sm">
              <FaEye />
              Views
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {views}
            </h3>

          </div>

          <div>

            <p className="flex items-center gap-2 text-slate-400 text-sm">
              <FaHeart />
              Likes
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {likes}
            </h3>

          </div>

        </div>

        {/* Chart */}

        <div className="p-8">

          <PerformanceChart
            uploads={uploads}
            likes={likes}
            views={views}
          />

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between px-8 py-5 border-t border-slate-800 bg-slate-950/40">

          <span className="flex items-center gap-2 text-green-400">

            <FaArrowTrendUp />

            Performance improving

          </span>

          <span className="text-slate-500 text-sm">
            Updated just now
          </span>

        </div>

      </div>

      {/* Right Panel */}

      <CreatorStats
        uploads={uploads}
        likes={likes}
        views={views}
      />

    </div>
  );
}

export default PerformanceSection;