import { Link, useParams } from "react-router-dom";
import { useMarketplace } from "../context/MarketplaceContext";

const creatorData = {
  "arnold-muyonga": {
    name: "Arnold Muyonga",
    role: "Digital Artist",
    followers: "1,200",
    uploads: 85,
    bio: ["Digital Artist", "Beat Producer", "Statistician"],
    location: "Nairobi, Kenya",
  },
  beatwave: {
    name: "BeatWave",
    role: "Music Producer",
    followers: "980",
    uploads: 42,
    bio: ["Beat Maker", "Producer", "Mix Engineer"],
    location: "Lagos, Nigeria",
  },
  "mhc-studio": {
    name: "MHC Studio",
    role: "Creative Studio",
    followers: "2,100",
    uploads: 38,
    bio: ["Architecture", "Brand Design", "Digital Assets"],
    location: "Kisumu, Kenya",
  },
  "jane-scholar": {
    name: "Jane Scholar",
    role: "Educational Creator",
    followers: "760",
    uploads: 14,
    bio: ["Lesson Notes", "Exam Prep", "Tutoring Resources"],
    location: "Nairobi, Kenya",
  },
};

const marketplaceItems = [
  {
    id: 1,
    title: "Digital Portrait",
    creatorSlug: "arnold-muyonga",
    category: "Digital Art",
    price: "KES 2,500",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
  },
  {
    id: 2,
    title: "Minimal House Plan",
    creatorSlug: "mhc-studio",
    category: "House Plans",
    price: "KES 8,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
  {
    id: 3,
    title: "Summer Beats",
    creatorSlug: "beatwave",
    category: "Music & Beats",
    price: "KES 1,200",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
  },
  {
    id: 4,
    title: "Math Notes Form 4",
    creatorSlug: "jane-scholar",
    category: "Notes",
    price: "KES 100",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800",
  },
];

export default function CreatorProfile() {
  const { creatorSlug } = useParams();
  const { marketplaceItems, loading } = useMarketplace();
  const creatorItems = marketplaceItems.filter((item) => item.creatorSlug === creatorSlug);

  const creator = creatorData[creatorSlug as keyof typeof creatorData] || {
    name: creatorItems[0]?.creator || "Creator",
    role: "Creator",
    followers: "0",
    uploads: creatorItems.length,
    bio: creatorItems.length > 0 ? ["Creator active on the marketplace"] : ["No profile yet"],
    location: "Unknown",
  };

  const sections = ["Artworks", "Music", "Videos", "Notes", "House Plans"];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-bold">Loading creator profile</h1>
          <p className="mt-4 text-slate-400">Fetching creator’s public listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">{creator.name}</h1>
              <p className="mt-2 text-slate-400">{creator.role}</p>
            </div>
            <div className="space-y-3 text-right">
              <div className="text-sm text-slate-400">Followers</div>
              <div className="text-2xl font-semibold">{creator.followers}</div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/40 p-5">
              <p className="text-sm uppercase text-slate-400">Uploads</p>
              <p className="mt-2 text-3xl font-semibold">{creator.uploads}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/40 p-5">
              <p className="text-sm uppercase text-slate-400">Location</p>
              <p className="mt-2 text-3xl font-semibold">{creator.location}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/40 p-5">
              <p className="text-sm uppercase text-slate-400">Rating</p>
              <p className="mt-2 text-3xl font-semibold">⭐⭐⭐⭐⭐</p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap gap-3">
              {sections.map((section) => (
                <button
                  key={section}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-cyan-500 hover:text-white transition"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
            <h2 className="text-2xl font-semibold">About</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              {creator.bio.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Creator Listings</h2>
              <p className="text-slate-400">See public releases and storefront items from {creator.name}.</p>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center rounded-2xl border border-cyan-500 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-300 hover:bg-cyan-500/20 transition"
            >
              Back to Marketplace
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {creatorItems.length > 0 ? (
              creatorItems.map((item) => (
                <div key={item.id} className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/80">
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.category}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                      <span>{item.price}</span>
                      <span>Online</span>
                    </div>
                    <Link
                      to={`/marketplace/item/${item.id}`}
                      className="mt-5 inline-flex w-full justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black hover:bg-cyan-400 transition"
                    >
                      View Listing
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-8 text-center text-slate-400">
                No public listings available yet. Come back soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
