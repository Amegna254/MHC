import { useAuth } from "../../hooks/useAuth";

function Topbar() {
  const { user } = useAuth();

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