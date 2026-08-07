import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaMoon,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex flex-wrap items-center justify-between gap-6">

      {/* Left */}
      <div>
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2 text-lg">
          Welcome back, {user?.fullName}
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}

        <div className="relative">

          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search creators, media, tags..."
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 py-4 pl-14 pr-24 text-white outline-none focus:border-cyan-500"
          />

          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            Ctrl + K
          </span>

        </div>

        {/* Upload */}

        <Link
          to="/upload"
          className="flex items-center gap-3 rounded-2xl bg-cyan-500 px-7 py-4 text-lg font-semibold text-black hover:bg-cyan-400 transition"
        >
          <FaPlus />
          Upload
        </Link>

        {/* Notification */}

        <button className="relative rounded-2xl bg-slate-900 p-4 hover:bg-slate-800">

          <FaBell size={20} />

          <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-red-500"></span>

        </button>

        {/* Dark Mode */}

        <button className="rounded-2xl bg-slate-900 p-4 hover:bg-slate-800">
          <FaMoon size={18} />
        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-2">

          <img
            src={user?.profileImage || "/avatar.png"}
            alt="avatar"
            className="h-12 w-12 rounded-full border-2 border-cyan-500 object-cover"
          />

          <div>

            <p className="font-semibold">
              {user?.fullName}
            </p>

            <p className="text-sm text-slate-400">
              @{user?.username}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;