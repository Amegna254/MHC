import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentUploads from "../components/dashboard/RecentUploads";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">

        <Topbar />

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <StatCard
            title="Images"
            value={0}
          />

          <StatCard
            title="Videos"
            value={0}
          />

          <StatCard
            title="Audio"
            value={0}
          />

          <StatCard
            title="Documents"
            value={0}
          />

        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <QuickActions />
        </div>

        {/* Recent Uploads */}
        <div className="mt-10">
          <RecentUploads />
        </div>

      </main>

    </div>
  );
}

export default Dashboard;