import { Link } from "react-router-dom";
import {
  FaStore,
  FaUsers,
  FaImages,
  FaUpload,
} from "react-icons/fa";

interface Props {
  totalListings: number;
}

function MarketplaceHero({ totalListings }: Props) {
  return (
    <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-700 via-slate-900 to-slate-950 p-10">

      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* Left */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300 font-semibold">
            <FaStore />
            MHC Marketplace
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            Buy & Sell
            <span className="text-cyan-400">
              {" "}Digital Assets
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-xl">
            Discover artwork, photography, music, videos,
            documents, software, house plans and much more
            from talented creators around the world.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/upload"
              className="rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-black hover:bg-cyan-400 transition"
            >
              <FaUpload className="inline mr-2" />
              Upload Media
            </Link>

            <Link
              to="/gallery"
              className="rounded-xl border border-white px-7 py-3 hover:bg-white hover:text-black transition"
            >
              Browse Gallery
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-5">

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6">

            <FaStore className="text-cyan-400 text-3xl" />

            <h2 className="mt-4 text-4xl font-bold">
              {totalListings}
            </h2>

            <p className="text-slate-400 mt-2">
              Listings
            </p>

          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6">

            <FaUsers className="text-cyan-400 text-3xl" />

            <h2 className="mt-4 text-4xl font-bold">
              Growing
            </h2>

            <p className="text-slate-400 mt-2">
              Community
            </p>

          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6">

            <FaImages className="text-cyan-400 text-3xl" />

            <h2 className="mt-4 text-4xl font-bold">
              All
            </h2>

            <p className="text-slate-400 mt-2">
              Media Types
            </p>

          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6">

            <FaUpload className="text-cyan-400 text-3xl" />

            <h2 className="mt-4 text-4xl font-bold">
              Easy
            </h2>

            <p className="text-slate-400 mt-2">
              Uploads
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MarketplaceHero;