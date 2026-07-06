import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaUpload,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-500 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;