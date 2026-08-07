import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getListingById,
  incrementView,
  likeItem,
  addComment,
} from "../services/mediaService";

interface Creator {
  id: number;
  fullName: string;
  username: string;
  profileImage?: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  commenter?: {
    username: string;
  };
}

interface Listing {
  id: number;
  title: string;
  description: string;
  image: string;
  fileName?: string;
  fileType: string;
  mimeType: string;
  category: string;

  creator: Creator;

  price: string;
  rating: number;
  likes: number;
  views: number;
  comments: Comment[];
}

export default function ListingDetail() {
  const { itemId } = useParams();

  const [item, setItem] = useState<Listing | null>(null);

  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);

  const [views, setViews] = useState(0);

  const [commentText, setCommentText] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const loadListing = async () => {
      try {
        if (!itemId) return;

        const listing = await getListingById(itemId);

        console.log("Listing:", listing);

        setItem(listing);

        setViews(listing.views || 0);

        setComments(listing.comments || []);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [itemId]);

  useEffect(() => {
    if (!itemId) return;

    const updateViews = async () => {
      try {
        const res = await incrementView(itemId);

        if (res?.views !== undefined) {
          setViews(res.views);
        }

      } catch (err) {
        console.error(err);
      }
    };

    updateViews();

  }, [itemId]);
    if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Loading Listing...</h1>
          <p className="mt-3 text-slate-400">
            Please wait while we load the media.
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Listing not found.
      </div>
    );
  }

  const fileUrl =
    item.image ||
    `http://localhost:5000/uploads/${item.fileName}`;

  const rating =
    typeof item.rating === "number"
      ? item.rating
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4">

      <div className="max-w-7xl mx-auto space-y-8">

        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* ================= LEFT ================= */}

            <div className="rounded-3xl overflow-hidden bg-slate-950">

              {item.fileType === "image" && (
                <img
                  src={fileUrl}
                  alt={item.title}
                  className="w-full object-cover"
                />
              )}

              {item.fileType === "video" && (
                <video
                  controls
                  className="w-full bg-black"
                >
                  <source
                    src={fileUrl}
                    type={item.mimeType}
                  />
                </video>
              )}

              {item.fileType === "audio" && (
                <div className="p-10">
                  <audio controls className="w-full">
                    <source
                      src={fileUrl}
                      type={item.mimeType}
                    />
                  </audio>
                </div>
              )}

              {item.fileType === "document" && (
                <iframe
                  src={fileUrl}
                  title={item.title}
                  className="w-full h-[700px] bg-white"
                />
              )}

            </div>

            {/* ================= RIGHT ================= */}

            <div className="space-y-6">

              <div>

                <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm">

                  {item.category}

                </p>

                <h1 className="mt-4 text-5xl font-bold">

                  {item.title}

                </h1>

                <p className="mt-5 text-slate-300 leading-8">

                  {item.description || "No description provided."}

                </p>

              </div>

              <div className="grid sm:grid-cols-2 gap-5">

                <div className="rounded-3xl bg-slate-950 p-6">

                  <p className="text-slate-400">

                    Price

                  </p>

                  <h2 className="mt-3 text-4xl font-bold">

                    {item.price || "Free"}

                  </h2>

                </div>

                <div className="rounded-3xl bg-slate-950 p-6">

                  <p className="text-slate-400">

                    Rating

                  </p>

                  <h2 className="mt-3 text-4xl font-bold">

                    ⭐ {rating.toFixed(1)}

                  </h2>

                  <div className="mt-3 text-slate-400">

                    👁 {views}

                    {" • "}

                    ❤️ {item.likes}

                    {" • "}

                    💬 {comments.length}

                  </div>

                </div>

              </div>
                            {/* ================= CREATOR ================= */}

              <div className="rounded-3xl bg-slate-950 p-6">

                <p className="text-sm uppercase text-slate-400">
                  Creator
                </p>

                <div className="mt-5 flex items-center gap-4">

                  {item.creator.profileImage ? (

                    <img
                      src={item.creator.profileImage}
                      alt={item.creator.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                    />

                  ) : (

                    <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-2xl font-bold">

                      {item.creator.fullName.charAt(0).toUpperCase()}

                    </div>

                  )}

                  <div>

                    <h2 className="text-2xl font-bold">

                      {item.creator.fullName}

                    </h2>

                    <p className="text-cyan-400">

                      @{item.creator.username}

                    </p>

                  </div>

                </div>

                <p className="mt-5 text-slate-400">

                  Creator on the MHC Marketplace.

                </p>

              </div>

              {/* ================= ACTIONS ================= */}

              <div className="grid sm:grid-cols-3 gap-4">

              <Link
  to={`/checkout/${item.id}`}
  className="block rounded-2xl bg-cyan-500 py-4 text-center font-bold text-black hover:bg-cyan-400 transition"
>
  Purchase Now
</Link>

                <button
                  onClick={async () => {
                    try {

                      const res = await likeItem(item.id);

                      setLiked(res.liked);

                      setItem((prev) =>
                        prev
                          ? {
                              ...prev,
                              likes: res.likes,
                            }
                          : prev
                      );

                    } catch (err) {

                      console.error(err);

                    }
                  }}
                  className="rounded-2xl border border-slate-700 py-4 font-semibold hover:border-cyan-500 transition"
                >
                  {liked ? "❤️ Liked" : "🤍 Like"}
                </button>

                <Link
                  to={`/creator/${item.creator.username}`}
                  className="rounded-2xl border border-slate-700 py-4 text-center font-semibold hover:border-cyan-500 hover:text-cyan-400 transition"
                >
                  View Creator
                </Link>

              </div>

            </div>

          </div>

        </div>
                {/* ================= COMMENTS ================= */}

        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl">

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

            {/* LEFT */}

            <div>

              <h2 className="text-2xl font-bold mb-6">

                Comments

              </h2>

              {comments.length === 0 ? (

                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 text-slate-400">

                  No comments yet.

                </div>

              ) : (

                <div className="space-y-4">

                  {comments.map((comment) => (

                    <div
                      key={comment.id}
                      className="rounded-2xl bg-slate-950 border border-slate-800 p-5"
                    >

                      <div className="flex justify-between mb-2">

                        <h4 className="font-semibold">

                          {comment.commenter?.username || "Anonymous"}

                        </h4>

                        <span className="text-sm text-slate-500">

                          {new Date(comment.createdAt).toLocaleDateString()}

                        </span>

                      </div>

                      <p className="text-slate-300">

                        {comment.content}

                      </p>

                    </div>

                  ))}

                </div>

              )}

              {/* ================= ADD COMMENT ================= */}

              <form
                className="mt-8 space-y-4"
                onSubmit={async (e) => {

                  e.preventDefault();

                  if (!commentText.trim()) return;

                  try {

                    const res = await addComment(
                      item.id,
                      commentText
                    );

                    setComments((prev) => [
                      res.comment,
                      ...prev,
                    ]);

                    setCommentText("");

                  } catch (err) {

                    console.error(err);

                  }

                }}
              >

                <textarea
                  rows={4}
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                  placeholder="Write a comment..."
                  className="w-full rounded-2xl bg-slate-950 border border-slate-800 p-4 outline-none focus:border-cyan-500"
                />

                <button
                  type="submit"
                  className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition"
                >
                  Add Comment
                </button>

              </form>

            </div>

            {/* RIGHT */}

            <div>

              <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">

                <h3 className="text-xl font-bold">

                  Creator Information

                </h3>

                <div className="mt-6 flex items-center gap-4">

                  {item.creator.profileImage ? (

                    <img
                      src={item.creator.profileImage}
                      alt={item.creator.fullName}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                  ) : (

                    <div className="w-14 h-14 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-xl">

                      {item.creator.fullName[0]}

                    </div>

                  )}

                  <div>

                    <h4 className="font-bold">

                      {item.creator.fullName}

                    </h4>

                    <p className="text-cyan-400">

                      @{item.creator.username}

                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-3 text-slate-400">

                  <p>
                    Uploads available on the MHC Marketplace.
                  </p>

                  <p>
                    Follow this creator to stay updated with future uploads.
                  </p>

                </div>

                <Link
                  to={`/creator/${item.creator.username}`}
                  className="mt-8 block rounded-2xl bg-cyan-500 text-center py-3 font-semibold text-black hover:bg-cyan-400 transition"
                >
                  Visit Creator Profile
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}