import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { categories } from "../data/marketplace";
import { useMarketplace } from "../context/MarketplaceContext";
import MarketplaceHero from "../components/marketplace/MarketplaceHero";
import MarketplaceGrid from "../components/marketplace/MarketplaceGrid";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">
          Loading Marketplace...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Top Buttons */}

        <div className="mb-8 flex flex-wrap gap-4">

          <Link
            to="/dashboard"
            className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700 transition"
          >
            ← Dashboard
          </Link>

          <Link
            to="/upload"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition"
          >
            Upload Media
          </Link>

          <Link
  to="/my-purchases"
  className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400 transition"
>
  My Purchases
</Link>

        </div>

        {/* Hero */}

<div className="rounded-3xl bg-gradient-to-r from-cyan-700 via-slate-900 to-slate-950 p-10">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

    {/* Left */}

    <div>

      <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300 font-semibold">
        Welcome to MHC Marketplace
      </span>

      <h1 className="mt-6 text-5xl font-extrabold">
        Buy & Sell
        <span className="text-cyan-400">
          {" "}Digital Assets
        </span>
      </h1>

      <p className="mt-5 max-w-2xl text-slate-300">
        Discover artwork, photography, videos, music,
        documents, notes, source code, house plans,
        templates and more from creators across the MHC community.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <Link
          to="/upload"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition"
        >
          Upload Media
        </Link>

        <Link
          to="/gallery"
          className="rounded-xl border border-white px-6 py-3 hover:bg-white hover:text-black transition"
        >
          Browse Gallery
        </Link>

      </div>

    </div>

    {/* Right */}

    <div className="grid grid-cols-2 gap-4 lg:w-80">

      <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-700">
        <p className="text-3xl font-bold text-cyan-400">
          {filteredItems.length}
        </p>
        <p className="text-slate-400 text-sm">
          Listings
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-700">
        <p className="text-3xl font-bold text-cyan-400">
          {categories.length - 1}
        </p>
        <p className="text-slate-400 text-sm">
          Categories
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-700">
        <p className="text-3xl font-bold text-cyan-400">
          {marketplaceItems.reduce((sum, item) => sum + (item.likes ?? 0), 0)}
        </p>
        <p className="text-slate-400 text-sm">
          Likes
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-700">
        <p className="text-3xl font-bold text-cyan-400">
          {marketplaceItems.reduce((sum, item) => sum + (item.views ?? 0), 0)}
        </p>
        <p className="text-slate-400 text-sm">
          Views
        </p>
      </div>

    </div>

  </div>

</div>
        {/* Filters */}

        <div className="mt-10 grid gap-4 lg:grid-cols-3">

          <input
            type="search"
            placeholder="Search marketplace..."
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
                {/* Marketplace Grid */}

        <div className="mt-10">
          <MarketplaceGrid marketplaceItems={filteredItems} />
        </div>

        {/* Empty State */}

        {filteredItems.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-700 p-12 text-center text-slate-400">
            No marketplace items found.
          </div>
        )}

      </div>
    </div>
  );
}