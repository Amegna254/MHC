import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-xl">Page Not Found</p>

      <Link
        to="/"
        className="mt-8 bg-cyan-500 px-6 py-3 rounded hover:bg-cyan-600"
      >
        Back Home
      </Link>
    </div>
  );
}

export default NotFound;