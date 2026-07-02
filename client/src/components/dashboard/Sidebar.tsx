import { Link } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaUpload,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        MHC
      </h1>

      <nav className="space-y-6">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-cyan-400"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/gallery"
          className="flex items-center gap-3 hover:text-cyan-400"
        >
          <FaImages />
          Gallery
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 hover:text-cyan-400"
        >
          <FaUpload />
          Upload
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 hover:text-cyan-400"
        >
          <FaUser />
          Profile
        </Link>

        <button className="flex items-center gap-3 text-red-400 hover:text-red-500">
          <FaSignOutAlt />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;