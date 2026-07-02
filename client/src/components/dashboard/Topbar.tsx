import { useAuth } from "../../hooks/useAuth";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="bg-slate-900 p-6 flex justify-between items-center rounded-xl">
      <div>
        <h2 className="text-3xl font-bold">
          Welcome back,
        </h2>

        <p className="text-cyan-400 text-xl">
          {user?.fullName}
        </p>
      </div>

      <div className="text-right">
        <p>{user?.email}</p>
        <p className="text-slate-400">{user?.role}</p>
      </div>
    </header>
  );
}

export default Topbar;