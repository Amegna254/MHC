import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaHome } from "react-icons/fa";

export default function BackToDashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();

  if (!token && !localStorage.getItem("token")) return null;

  return (
    <div className="relative inline-block group">
      <button
        onClick={() => navigate("/dashboard")}
        aria-label="Back to dashboard"
        className="inline-flex items-center justify-center bg-slate-800 text-white w-8 h-8 rounded-md shadow-sm hover:bg-slate-700 transition"
      >
        <FaHome className="w-4 h-4" />
      </button>

      {/* subtle tooltip */}
      <span className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-slate-300 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100">
        Back
      </span>
    </div>
  );
}
