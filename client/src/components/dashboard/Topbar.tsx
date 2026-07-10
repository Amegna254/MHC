import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BackToDashboard from "../BackToDashboard";

function Topbar() {
  const { user } = useAuth();
  const [showBack, setShowBack] = useState<boolean>(true);

  useEffect(() => {
    const val = localStorage.getItem("showBackButton");
    setShowBack(val === null ? true : val === "true");
  }, []);

  const toggleShowBack = () => {
    const next = !showBack;
    setShowBack(next);
    localStorage.setItem("showBackButton", String(next));
  };

  return (
    <header className="bg-slate-900 rounded-xl p-6 flex justify-between items-center shadow-lg">

      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold">
          Welcome back 👋
        </h2>

        <p className="text-cyan-400 text-xl mt-1">
          {user?.fullName}
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">

        {/* Back button toggle & back button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleShowBack}
            title={showBack ? "Hide back button" : "Show back button"}
            className="p-2 rounded hover:bg-slate-800"
          >
            {showBack ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
          </button>

          {showBack && <BackToDashboard />}
        </div>

        <div className="text-right">
          <p className="font-semibold">
            {user?.fullName}
          </p>

          <p className="text-slate-400 text-sm">
            {user?.email}
          </p>

          <span className="inline-block mt-2 px-3 py-1 bg-cyan-500 rounded-full text-sm font-medium">
            {user?.role}
          </span>
        </div>

        <img
          src={
            user?.profileImage
              ? `http://localhost:5000/uploads/avatars/${user.profileImage}`
              : "/default-avatar.png"
          }
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-cyan-500 object-cover"
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.png";
          }}
        />

      </div>

    </header>
  );
}

export default Topbar;