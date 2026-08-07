import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  followCreator,
  unfollowCreator,
  getFollowStatus,
} from "../services/followService";
interface Upload {
  id: number;
  title: string;
  description: string;
  category: string;

  fileType: string;
  mimeType: string;

  image: string;

  likes: number;
  views: number;
  createdAt: string;
}

interface Creator {
  id: number;
  fullName: string;
  username: string;
  profileImage: string | null;
  bio: string | null;
}

interface Stats {
  uploads: number;
  likes: number;
  views: number;
  followers?: number;
  following?: number;
}
export default function CreatorProfile() {
  const { creatorSlug } = useParams();

  const [creator, setCreator] = useState<Creator | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCreator();
  }, [creatorSlug]);

  async function loadCreator() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/creators/${creatorSlug}`
      );

      setCreator(response.data.creator);
      setStats(response.data.stats);
      setUploads(response.data.uploads);
      try {
          const follow = await getFollowStatus(response.data.creator.id);

          setIsFollowing(follow.following);

          setStats((prev) =>
          prev
          ? {
          ...prev,
          followers: follow.followers,
          following: follow.followingCount,
            }
          : prev
          );
          } catch (err) {
         console.error(err);
          }
       } 
      catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFollow() {
  if (!creator) return;

  try {
    setFollowLoading(true);

    if (isFollowing) {
      await unfollowCreator(creator.id);

      setIsFollowing(false);

      setStats((prev) =>
        prev
          ? {
              ...prev,
              followers: Math.max((prev.followers || 1) - 1, 0),
            }
          : prev
      );
    } else {
      await followCreator(creator.id);

      setIsFollowing(true);

      setStats((prev) =>
        prev
          ? {
              ...prev,
              followers: (prev.followers || 0) + 1,
            }
          : prev
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    setFollowLoading(false);
  }
}
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading creator...
      </div>
    );
  }

  if (!creator || !stats) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Creator not found.
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* Cover */}
    <div className="h-64 bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900"></div>

    <div className="max-w-screen-2xl mx-auto px-6">

      {/* Profile Header */}
    <div className="-mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

      <div className="flex items-end gap-6">

          <img
            src={
              creator.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt={creator.fullName}
            className="h-40 w-40 rounded-full border-4 border-slate-950 object-cover bg-slate-800"
          />

        <div className="pb-3">

          <h1 className="text-4xl font-bold">
          {creator.fullName}
          </h1>

         <p className="text-cyan-400 text-lg">
         @{creator.username}
         </p>

         <p className="mt-3 max-w-2xl text-slate-300 leading-relaxed">
         {creator.bio || "This creator hasn't added a bio yet."}
         </p>

        </div>

      </div>

        <button
  onClick={handleFollow}
  disabled={followLoading}
  className={`rounded-xl px-8 py-3 font-semibold transition ${
    isFollowing
      ? "bg-emerald-500 text-black hover:bg-emerald-400"
      : "bg-cyan-500 text-black hover:bg-cyan-400"
  }`}
>
  {followLoading
    ? "Please wait..."
    : isFollowing
    ? "Following"
    : "Follow"}
</button>

    </div>

      {/* Statistics */}

      <div className="mt-12 grid gap-6 md:grid-cols-5">

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

          <h2 className="text-4xl font-bold text-cyan-400">
            {stats.uploads}
          </h2>

          <p className="mt-2 text-slate-400">
            Uploads
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

          <h2 className="text-4xl font-bold text-cyan-400">
            {stats.likes}
          </h2>

          <p className="mt-2 text-slate-400">
            Total Likes
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

          <h2 className="text-4xl font-bold text-cyan-400">
            {stats.views}
          </h2>

          <p className="mt-2 text-slate-400">
            Total Views
          </p>

        </div>

      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

  <h2 className="text-4xl font-bold text-cyan-400">
    {stats.followers ?? 0}
  </h2>

  <p className="mt-2 text-slate-400">
    Followers
  </p>

</div>

<div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

  <h2 className="text-4xl font-bold text-cyan-400">
    {stats.following ?? 0}
  </h2>

  <p className="mt-2 text-slate-400">
    Following
  </p>

</div>

      {/* Uploads Title */}

      <div className="mt-16 mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Creator Uploads
          </h2>

          <p className="text-slate-400 mt-2">
            Browse everything shared publicly by this creator.
          </p>

        </div>

      </div>
      {/* Upload Grid */}

{/* Upload Grid */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">

  {uploads.map((upload) => (

    <div
      key={upload.id}
      className="overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500 transition shadow-lg"
    >

      {upload.fileType === "image" && (
  <img
    src={upload.image}
    alt={upload.title}
    className="h-48 w-full object-cover"
  />
)}

{upload.fileType === "video" && (
  <video
    controls
    className="h-48 w-full object-cover bg-black"
  >
    <source src={upload.image} type={upload.mimeType} />
    Your browser does not support video playback.
  </video>
)}

{upload.fileType === "audio" && (
  <div className="flex h-48 items-center justify-center bg-slate-800 p-4">
    <audio controls className="w-full">
      <source src={upload.image} type={upload.mimeType} />
      Your browser does not support audio playback.
    </audio>
  </div>
)}

{upload.fileType === "document" && (
  <div className="flex h-48 items-center justify-center bg-slate-800 text-7xl">
    📄
  </div>
)}

      <div className="p-6">

        <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
          {upload.category}
        </span>

        <h3 className="mt-4 text-2xl font-semibold">
          {upload.title}
        </h3>

        <p className="mt-2 text-slate-400 line-clamp-2">
          {upload.description}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">

          <span>
            ❤️ {upload.likes}
          </span>

          <span>
            👁 {upload.views}
          </span>

        </div>

        <Link
          to={`/marketplace/item/${upload.id}`}
          className="mt-6 inline-flex w-full justify-center rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition"
        >
          View Listing
        </Link>

      </div>

    </div>

  ))}

</div>

    </div>

  </div>
);
}