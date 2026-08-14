import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaUpload,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const initiateLogout = () => setShowConfirm(true);

  const handleLogout = () => {
    // perform logout action
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowConfirm(false);
    // force full reload to ensure in-memory state is cleared
    window.location.replace("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        MHC
      </h1>

      <nav className="space-y-6">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-cyan-400 transition"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/gallery"
          className="flex items-center gap-3 hover:text-cyan-400 transition"
        >
          <FaImages />
          Gallery
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 hover:text-cyan-400 transition"
        >
          <FaUpload />
          Upload
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 hover:text-cyan-400 transition"
        >
          <FaUser />
          Profile
        </Link>

        <Link
          to="/performance"
          className="flex items-center gap-3 hover:text-cyan-400 transition"
        >
          <FaUser />
          Performance
        </Link>

        <>
          <button
            onClick={initiateLogout}
            aria-label="Logout"
            className="flex items-center gap-3 text-red-400 hover:text-red-500 transition rounded-md px-3 py-2"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {showConfirm && (
            <ConfirmModal
              title="Log out"
              message="Are you sure you want to log out of your account?"
              onCancel={() => setShowConfirm(false)}
              onConfirm={handleLogout}
            />
          )}
        </>

      </nav>
    </aside>
  );
}

export default Sidebar;