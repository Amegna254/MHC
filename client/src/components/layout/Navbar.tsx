import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-cyan-400">MHC</h1>

        <div className="hidden md:flex gap-8">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <Link to="/gallery" className="hover:text-cyan-400">Gallery</Link>
          <Link to="/portfolio" className="hover:text-cyan-400">Portfolio</Link>
          <Link to="/about" className="hover:text-cyan-400">About</Link>
          <Link to="/contact" className="hover:text-cyan-400">Contact</Link>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-cyan-500 hover:bg-cyan-500/20">
            Login
          </button>

          <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}