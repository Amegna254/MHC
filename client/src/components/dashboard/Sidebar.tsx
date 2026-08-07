import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaUpload,
  FaUser,
  FaChartLine,
  FaStore,
  FaCog,
  FaSignOutAlt,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";

function Sidebar() {
  const { user, logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Marketplace",
      icon: <FaStore />,
      path: "/marketplace",
    },
    {
      title: "Gallery",
      icon: <FaImages />,
      path: "/gallery",
    },
    {
      title: "Upload",
      icon: <FaUpload />,
      path: "/upload",
    },
    {
      title: "Performance",
      icon: <FaChartLine />,
      path: "/performance",
    },
    {
      title: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <>
      <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

        {/* Logo */}

        <div className="p-8">

          <h1 className="text-4xl font-black tracking-wide text-cyan-400">
            MHC
          </h1>

          <p className="text-slate-400 mt-2">
            Creator Studio
          </p>

        </div>

        {/* User */}

        <div className="px-8 mb-8">

          <div className="bg-slate-800 rounded-2xl p-5">

            <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-2xl font-bold text-black">
              {user?.fullName?.charAt(0)}
            </div>

            <h2 className="mt-4 font-semibold">
              {user?.fullName}
            </h2>

            <p className="text-sm text-slate-400">
              @{user?.username}
            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex-1 px-4 space-y-2">

          {menu.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                  isActive
                    ? "bg-cyan-500 text-black font-semibold"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              {item.title}

            </NavLink>

          ))}

        </nav>

        {/* Storage */}

        <div className="p-6">

          <div className="bg-slate-800 rounded-2xl p-5">

            <div className="flex justify-between mb-3">

              <span>Storage</span>

              <span>62%</span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">

              <div className="bg-cyan-400 h-3 rounded-full w-2/3"></div>

            </div>

            <button className="mt-5 w-full rounded-xl bg-cyan-500 text-black py-3 font-semibold hover:bg-cyan-400 transition">

              <FaCloudUploadAlt className="inline mr-2" />

              Upgrade Storage

            </button>

          </div>

        </div>

        {/* Logout */}

        <div className="p-6">

          <button
            onClick={() => setShowConfirm(true)}
            className="w-full rounded-xl bg-red-500 py-3 flex justify-center items-center gap-3 hover:bg-red-600 transition"
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>

      </aside>

      {showConfirm && (
        <ConfirmModal
          title="Logout"
          message="Are you sure you want to logout?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={logout}
        />
      )}
    </>
  );
}

export default Sidebar;