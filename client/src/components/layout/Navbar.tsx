import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, token } = useAuth();
  const hasToken = Boolean(token && token !== "null" && token !== "undefined");
  const isAuthenticated = Boolean(user && hasToken);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400 hover:text-cyan-300"
        >
          MHC
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-white">
          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>

          <Link to="/marketplace" className="hover:text-cyan-400 transition">
            Marketplace
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/gallery" className="hover:text-cyan-400 transition">
                Gallery
              </Link>

              <Link to="/upload" className="hover:text-cyan-400 transition">
                Upload
              </Link>
            </>
          )}

          <Link to="/portfolio" className="hover:text-cyan-400 transition">
            Portfolio
          </Link>

          <Link to="/about" className="hover:text-cyan-400 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-cyan-400 transition">
            Contact
          </Link>
        </div>

        {/* Authentication Buttons */}
        <div className="flex gap-3">
          {hasToken ? (
            <Link
              to="/profile"
              className="px-5 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-cyan-500 text-white hover:bg-cyan-500/20 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}