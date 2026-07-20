import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListingById, incrementView, likeItem, addComment } from "../services/mediaService";

export default function ListingDetail() {
  const { itemId } = useParams();
  interface Listing {
  id: number;
  title: string;
  description: string;
  image: string;
  fileType: string;
  mimeType: string;
  category: string;
  creator: string;
  creatorSlug: string;
  price: string;
  rating: number;
  likes: number;
  views: number;
  comments: any[];
}

const [item, setItem] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState<number>(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const loadListing = async () => {
      try {
        if (!itemId) return;
        const listing = await getListingById(itemId);
        console.log("Listing:", listing);
        console.log("File Type:", listing.fileType);
        console.log("File URL:", listing.image);
        console.log("Mime Type:", listing.mimeType);


        setItem(listing);
        setViews(listing.views || 0);
        setComments(listing.comments || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [itemId]);

  useEffect(() => {
    if (!itemId) return;
    const sendView = async () => {
      try {
        const res = await incrementView(itemId);
        setViews(res.views ?? views + 1);
      } catch (err) {
        // ignore
      }
    };

    sendView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-bold">Loading listing...</h1>
          <p className="mt-4 text-slate-400">Please wait while we load the marketplace item details.</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-bold">Listing not found</h1>
          <p className="mt-4 text-slate-400">The item you requested does not exist or has been removed.</p>
          <Link
            to="/marketplace"
            className="mt-8 inline-flex rounded-2xl border border-cyan-500 bg-cyan-500/10 px-6 py-3 text-sm text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const creator = {
    name: item.creator,
    role: "Creator",
    followers: "0",
    uploads: 0,
    bio: ["Creator active on the marketplace"],
    location: "Unknown",
  };

  const rating = typeof item.rating === "number" ? item.rating : 0;
  const renderedComments = Array.isArray(comments)
    ? comments
    : Array.isArray(item.comments)
    ? item.comments
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl overflow-hidden bg-slate-950/80">
     {item.fileType === "image" && (
    <img
      src={item.image}
      alt={item.title}
      className="h-full w-full object-cover"
    />
  )}

  {item.fileType === "video" && (
    <video
      controls
      className="w-full h-full bg-black"
    >
      <source
        src={item.image}
        type={item.mimeType}
      />
      Your browser does not support video playback.
    </video>
  )}

  {item.fileType === "audio" && (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <audio controls className="w-full">
        <source
          src={item.image}
          type={item.mimeType}
        />
        Your browser does not support audio.
      </audio>
    </div>
  )}

  {item.fileType === "document" && (
    <iframe
      src={item.image}
      title={item.title}
      className="w-full h-[700px] bg-white"
    />
  )}

</div>

            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">{item.category}</p>
                <h1 className="mt-4 text-4xl font-bold">{item.title}</h1>
                <p className="mt-3 text-slate-400">A curated creator release available for purchase or licensing.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/40 p-5">
                  <p className="text-sm uppercase text-slate-400">Price</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{item.price}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/40 p-5">
                  <p className="text-sm uppercase text-slate-400">Rating</p>
                  <p className="mt-2 text-3xl font-semibold">{rating.toFixed(1)} ⭐</p>
                  <div className="mt-2 text-sm text-slate-400">{views} views • ❤️ {item.likes ?? 0} • 💬 {comments.length}</div>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-950/40 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase text-slate-400">Creator</p>
                    <Link
                      to={`/creator/${item.creatorSlug}`}
                      className="mt-2 block text-2xl font-semibold text-white hover:text-cyan-300"
                    >
                      {item.creator}
                    </Link>
                  </div>
                  <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-300">
                    {creator.location}
                  </div>
                </div>
                <p className="mt-4 text-slate-400">
                  {creator.bio.slice(0, 2).join(" • ")}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="w-full rounded-2xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-black hover:bg-cyan-400 transition">
                  Purchase Now
                </button>
                <button
  onClick={async () => {
    try {
      const res = await likeItem(item.id);

      setLiked(res.liked);

      setItem((prev: any) => ({
        ...prev,
        likes: res.likes,
      }));
    } catch (err) {
      console.error(err);
    }
  }}
  className="w-full rounded-2xl border border-slate-800 px-5 py-4 text-sm font-semibold text-cyan-300 hover:border-cyan-500 hover:text-white transition text-center"
>
  {liked ? "❤️ Liked" : "🤍 Like"}
</button>
                <Link
                  to={`/creator/${item.creatorSlug}`}
                  className="w-full rounded-2xl border border-slate-800 px-5 py-4 text-sm font-semibold text-cyan-300 hover:border-cyan-500 hover:text-white transition text-center"
                >
                  View Creator
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="rounded-3xl bg-slate-950/40 p-6">
              <h3 className="text-lg font-semibold text-white">Comments</h3>
              <div className="mt-4 space-y-4">
                {comments.length === 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-slate-400">No comments yet.</div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="rounded-3xl bg-slate-900 p-4">
                      <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                        <span>{comment.commenter?.username || "Anonymous"}</span>
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-2 text-slate-200">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>

              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!item.id || !commentText.trim()) return;
                  try {
                    const res = await addComment(item.id, commentText.trim());
                    setComments((prev) => [res.comment, ...prev]);
                    setCommentText("");
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="mt-6 space-y-3"
              >
                <textarea
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-white outline-none"
                  placeholder="Leave a comment"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400 transition"
                >
                  Add Comment
                </button>
              </form>
            </div>
            <div className="rounded-3xl bg-slate-950/40 p-6">
              <h3 className="text-lg font-semibold text-white">Creator</h3>
              <p className="mt-4 text-slate-300">{creator.bio.slice(0, 2).join(" • ")}</p>
              <p className="mt-4 text-sm text-slate-400">Location: {creator.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
