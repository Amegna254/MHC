import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Hero() {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto text-center">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Showcase Your Creativity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-xl text-slate-300"
        >
          Upload artwork, videos, music, documents,
          architectural designs and professional portfolios.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          {isAuthenticated ? (
            <Link
              to="/upload"
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold"
            >
              Start Creating
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold"
            >
              Login to Upload
            </Link>
          )}

          <Link
            to="/marketplace"
            className="border border-cyan-500 hover:bg-cyan-500/20 px-8 py-4 rounded-xl"
          >
            Explore Marketplace
          </Link>
        </motion.div>

        <div className="mt-12 flex justify-center gap-10 text-center">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">10K+</h2>
            <p className="text-slate-400">Artists</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-cyan-400">50K+</h2>
            <p className="text-slate-400">Projects</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-cyan-400">100+</h2>
            <p className="text-slate-400">Countries</p>
          </div>
        </div>

      </div>
    </section>
  );
}