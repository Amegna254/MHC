import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { categories } from "../data/marketplace";
import { useMarketplace } from "../context/MarketplaceContext";

export default function Marketplace() {
  const { marketplaceItems, loading } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return marketplaceItems.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.categorySlug === selectedCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.creator.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-bold">Loading marketplace</h1>
          <p className="mt-4 text-slate-400">Fetching public creator releases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <p className="text-sm text-cyan-400 uppercase tracking-[0.4em]">Marketplace</p>
          <h1 className="mt-4 text-4xl font-bold">Browse creator storefronts and public releases.</h1>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Discover digital art, beats, videos, notes, house plans, photography, and more — no login required to browse.
          </p>
        </header>

        <section className="mb-8">
          <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedCategory === category.slug
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-200"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-cyan-500 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search art, music, notes..."
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 text-white focus:border-cyan-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-semibold text-cyan-300 hover:border-cyan-500 hover:bg-slate-900/90 transition"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Trending Listings</h2>
            <p className="text-slate-400">Top creator releases for the current season.</p>
          </div>
          <div className="text-sm text-slate-400">
            {filteredItems.length} item{filteredItems.length === 1 ? "" : "s"} found
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="rounded-3xl overflow-hidden bg-slate-900 shadow-xl shadow-black/20">
              <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{item.category}</span>
                  <span>❤️ {item.likes}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-400">By {item.creator}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-white">{item.price}</span>
                  <Link
                    to={`/creator/${item.creatorSlug}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    View Creator
                  </Link>
                </div>
                <Link
                  to={`/marketplace/item/${item.id}`}
                  className="mt-5 inline-flex w-full justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-black hover:bg-cyan-400 transition"
                >
                  View Listing
                </Link>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-10 text-center text-slate-400">
              No listings match your search or category filter.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
