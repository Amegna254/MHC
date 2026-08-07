import { Link } from "react-router-dom";
import {
  FaEye,
  FaHeart,
  FaComment,
  FaArrowRight,
} from "react-icons/fa";

interface Props {
  marketplaceItems: any[];
}

function MarketplacePreview({ marketplaceItems }: Props) {
  return (
    <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Marketplace
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Latest marketplace listings
          </p>
        </div>

        <Link
          to="/marketplace"
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-400 transition"
        >
          View Marketplace
          <FaArrowRight />
        </Link>

      </div>

      {marketplaceItems.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
          No marketplace listings found.
        </div>

      ) : (

        <div className="space-y-5">

          {marketplaceItems.slice(0, 4).map((item) => (

            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover"
              />

              <div className="flex-1 p-4">

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {item.category}
                  </span>

                  <span className="text-lg font-bold text-cyan-400">
                    {item.price} {item.currency ?? ""}
                  </span>

                </div>

                <h3 className="mt-3 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  by {item.creator}
                </p>

                <div className="mt-5 flex gap-6 text-sm text-slate-400">

                  <span className="flex items-center gap-2">
                    <FaHeart />
                    {item.likes ?? 0}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaEye />
                    {item.views ?? 0}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaComment />
                    {item.comments ?? 0}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default MarketplacePreview;