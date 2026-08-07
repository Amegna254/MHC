import { Link } from "react-router-dom";
import {
  FaHeart,
  FaEye,
  FaComment,
  FaArrowRight,
  FaUserCircle,
} from "react-icons/fa";

interface Props {
  item: any;
}

function MarketplaceCard({ item }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-lg hover:border-cyan-500 hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300">

      {/* Preview */}

      <div className="relative">

        {item.fileType === "image" && (
          <img
            src={item.image}
            alt={item.title}
            className="h-56 w-full object-cover"
          />
        )}

        {item.fileType === "video" && (
          <video
            controls
            className="h-56 w-full object-cover bg-black"
          >
            <source
              src={item.image}
              type={item.mimeType}
            />
          </video>
        )}

        {item.fileType === "audio" && (
          <div className="flex h-56 items-center justify-center bg-slate-800">
            <audio controls className="w-11/12">
              <source
                src={item.image}
                type={item.mimeType}
              />
            </audio>
          </div>
        )}

        {item.fileType === "document" && (
          <div className="flex h-56 items-center justify-center bg-slate-800 text-7xl">
            📄
          </div>
        )}

        {item.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold text-black">
            FEATURED
          </span>
        )}

        <span className="absolute right-4 top-4 rounded-full bg-cyan-500 px-4 py-1 font-semibold text-black">
          {item.price}
        </span>

      </div>

      {/* Content */}

      <div className="p-6">

        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
          {item.category}
        </span>

        <h2 className="mt-4 text-xl font-bold">
          {item.title}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-slate-400">

          <FaUserCircle />

          <span>{item.creator}</span>

        </div>

        <div className="mt-6 flex justify-between text-sm text-slate-400">

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

        <div className="mt-8 space-y-3">

          <Link
            to={`/marketplace/item/${item.id}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition"
          >
            View Listing
            <FaArrowRight />
          </Link>

          <Link
            to={`/creator/${item.creatorSlug}`}
            className="block rounded-xl border border-cyan-500 py-3 text-center text-cyan-300 hover:bg-cyan-500 hover:text-black transition"
          >
            Visit Creator
          </Link>

          {item.isForSale && (
  <Link
    to={`/checkout/${item.id}`}
    className="block w-full rounded-xl bg-emerald-500 py-3 text-center font-semibold text-black hover:bg-emerald-400 transition"
  >
    Buy Now
  </Link>
)}


        </div>

      </div>

    </div>
  );
}

export default MarketplaceCard;