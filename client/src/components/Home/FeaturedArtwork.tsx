const artworks = [
  {
    title: "Sunset Landscape",
    creator: "Arnold",
    category: "Painting",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  },
  {
    title: "Modern House Plan",
    creator: "MHC Studio",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800",
  },
  {
    title: "Nature Photography",
    creator: "Jane",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
  },
];

export default function FeaturedArtwork() {
  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Artwork
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  {artwork.title}
                </h3>

                <p className="mt-2 text-slate-400">
                  By {artwork.creator}
                </p>

                <span className="inline-block mt-4 bg-cyan-600 px-3 py-1 rounded-full text-sm">
                  {artwork.category}
                </span>

                <div className="flex justify-between mt-6 text-slate-300 text-sm">
                  <span>❤️ 245</span>
                  <span>💬 18</span>
                  <span>👁️ 1.2K</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}