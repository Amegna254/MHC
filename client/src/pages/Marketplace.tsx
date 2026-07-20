import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { categories } from "../data/marketplace";
import { useMarketplace } from "../context/MarketplaceContext";

export default function Marketplace() {
  const { marketplaceItems, loading } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredItems = useMemo(() => {
    let items = marketplaceItems.filter((item) => {
      const query = searchQuery.toLowerCase();

      const matchesCategory =
        selectedCategory === "all" ||
        item.categorySlug === selectedCategory;

      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        item.creator.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });

    switch (sortBy) {
      case "likes":
        items.sort((a, b) => b.likes - a.likes);
        break;

      case "views":
        items.sort((a, b) => b.views - a.views);
        break;

      case "priceLow":
        items.sort(
          (a, b) =>
            Number(String(a.price).replace(/[^\d.]/g, "")) -
            Number(String(b.price).replace(/[^\d.]/g, ""))
        );
        break;

      case "priceHigh":
        items.sort(
          (a, b) =>
            Number(String(b.price).replace(/[^\d.]/g, "")) -
            Number(String(a.price).replace(/[^\d.]/g, ""))
        );
        break;

      default:
        break;
    }

    return items;
  }, [marketplaceItems, searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Marketplace...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto">

  <header className="mb-16 rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-700 via-slate-900 to-slate-950 p-12">

    <div className="max-w-3xl">

    <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300 font-semibold">
      Welcome to MHC Marketplace
    </span>

    <h1 className="mt-6 text-6xl font-extrabold leading-tight">
      Buy & Sell
      <span className="text-cyan-400"> Digital Assets</span>
    </h1>

    <p className="mt-6 text-lg text-slate-300">
      Discover high-quality artwork, beats, videos, photography,
      house plans, notes and creative assets uploaded by creators
      around the world.
    </p>

    <div className="mt-8 flex gap-4">

      <Link
        to="/register"
        className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black hover:bg-cyan-400"
      >
        Start Selling
      </Link>

      <Link
        to="/gallery"
        className="rounded-xl border border-white px-8 py-4 hover:bg-white hover:text-black"
      >
        Explore Gallery
      </Link>

    </div>

   </div>

  </header>
             <section className="mb-10">
          <div className="grid gap-4 lg:grid-cols-3">

            <input
              type="search"
              placeholder="Search artwork, music, creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-500"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
            >
              {categories.map((category) => (
                <option
                  key={category.slug}
                  value={category.slug}
                >
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
            >
              <option value="newest">Newest</option>
              <option value="likes">Most Liked</option>
              <option value="views">Most Viewed</option>
              <option value="priceLow">Lowest Price</option>
              <option value="priceHigh">Highest Price</option>
            </select>

          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredItems.map((item) => (

            <div
              key={item.id}
              className="overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-xl hover:scale-[1.02] transition"
            >

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
    <source src={item.image} type={item.mimeType} />
    Your browser does not support video playback.
  </video>
)}

{item.fileType === "audio" && (
  <div className="flex h-56 items-center justify-center bg-slate-800 p-4">
    <audio controls className="w-full">
      <source src={item.image} type={item.mimeType} />
      Your browser does not support audio playback.
    </audio>
  </div>
)}

{item.fileType === "document" && (
  <div className="flex h-56 items-center justify-center bg-slate-800 text-7xl">
    📄
  </div>
)}

                {item.featured && (
                  <span className="absolute top-3 left-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                    Featured
                  </span>
                )}

              </div>

              <div className="p-5">

                <div className="flex justify-between text-sm text-slate-400">
                  <span>{item.category}</span>
                  <span>{item.price}</span>
                </div>

                <h2 className="mt-4 text-xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-2 text-slate-400">
                  by {item.creator}
                </p>

                <div className="mt-4 flex justify-between text-sm text-slate-400">
                  <span>❤️ {item.likes}</span>
                  <span>👁 {item.views}</span>
                  <span>💬 {item.comments}</span>
                </div>

                <div className="mt-6 space-y-3">

                  <Link
                    to={`/marketplace/item/${item.id}`}
                    className="block rounded-xl bg-cyan-500 py-3 text-center font-semibold text-black hover:bg-cyan-400"
                  >
                    View Listing
                  </Link>

                  <Link
                    to={`/creator/${item.creatorSlug}`}
                    className="block rounded-xl border border-cyan-500 py-3 text-center text-cyan-300 hover:bg-cyan-500 hover:text-black"
                  >
                    Visit Creator
                  </Link>

                  {item.isForSale && (
                    <button className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black hover:bg-emerald-400">
                      Buy Now
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

        </section>

        {filteredItems.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-700 p-12 text-center text-slate-400">
            No marketplace items found.
          </div>
        )}

      </div>
    </div>
  );
}   