import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaVideo,
  FaMusic,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileArchive,
  FaFileCode,
  FaFileAlt,
  FaEye,
  FaHeart,
  FaComment,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { deleteMedia } from "../../services/mediaService";

interface Upload {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  mimeType?: string;
  likes?: number;
  views?: number;
  comments?: number;
  createdAt: string;
}

interface DashboardData {
  user: any;

  stats: {
    totalUploads: number;
    images: number;
    videos: number;
    audio: number;
    documents: number;
  };

  performance: {
    totalViews: number;
    totalLikes: number;
  };

  recentUploads: Upload[];
}

interface Props {
  uploads: Upload[];
  dashboard: DashboardData | null;
  setDashboard: React.Dispatch<
    React.SetStateAction<DashboardData | null>
  >;
}

function getPreview(upload: Upload) {
  const url = `http://localhost:5000/uploads/${upload.fileName}`;

  if (upload.fileType === "image") {
    return (
      <img
        src={url}
        alt={upload.title}
        className="w-20 h-20 rounded-xl object-cover"
      />
    );
  }

  if (upload.fileType === "video") {
    return (
      <div className="w-20 h-20 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 text-3xl">
        <FaVideo />
      </div>
    );
  }

  if (upload.fileType === "audio") {
    return (
      <div className="w-20 h-20 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 text-3xl">
        <FaMusic />
      </div>
    );
  }

  const mime = upload.mimeType || "";

  if (mime.includes("pdf"))
    return (
      <div className="w-20 h-20 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 text-3xl">
        <FaFilePdf />
      </div>
    );

  if (mime.includes("word"))
    return (
      <div className="w-20 h-20 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-3xl">
        <FaFileWord />
      </div>
    );

  if (mime.includes("excel") || mime.includes("sheet"))
    return (
      <div className="w-20 h-20 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 text-3xl">
        <FaFileExcel />
      </div>
    );

  if (mime.includes("presentation"))
    return (
      <div className="w-20 h-20 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-3xl">
        <FaFilePowerpoint />
      </div>
    );

  if (mime.includes("zip") || mime.includes("rar"))
    return (
      <div className="w-20 h-20 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-3xl">
        <FaFileArchive />
      </div>
    );

  if (
    mime.includes("javascript") ||
    mime.includes("json") ||
    mime.includes("html") ||
    mime.includes("css") ||
    mime.includes("xml")
  )
    return (
      <div className="w-20 h-20 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-3xl">
        <FaFileCode />
      </div>
    );

  return (
    <div className="w-20 h-20 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 text-3xl">
      <FaFileAlt />
    </div>
  );
}

function RecentUploads({
  uploads,
  dashboard,
  setDashboard,
}: Props) {

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [sort, setSort] = useState("newest");

  const handleDelete = async (id: number) => {

    if (!window.confirm("Delete this upload?")) return;

    try {

      await deleteMedia(id);

      if (!dashboard) return;

      const deleted = dashboard.recentUploads.find(
        media => media.id === id
      );

      const updatedUploads = dashboard.recentUploads.filter(
        media => media.id !== id
      );

      setDashboard({

        ...dashboard,

        recentUploads: updatedUploads,

        stats: {

          ...dashboard.stats,

          totalUploads: dashboard.stats.totalUploads - 1,

          images:
            deleted?.fileType === "image"
              ? dashboard.stats.images - 1
              : dashboard.stats.images,

          videos:
            deleted?.fileType === "video"
              ? dashboard.stats.videos - 1
              : dashboard.stats.videos,

          audio:
            deleted?.fileType === "audio"
              ? dashboard.stats.audio - 1
              : dashboard.stats.audio,

          documents:
            deleted?.fileType === "document"
              ? dashboard.stats.documents - 1
              : dashboard.stats.documents,

        },

      });

    } catch (err) {

      console.error(err);

      alert("Failed to delete upload.");

    }

  };

  const filteredUploads = uploads
    .filter(upload => {

      const matchesSearch =
        upload.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : upload.fileType === filter;

      return matchesSearch && matchesFilter;

    })
    .sort((a, b) => {

      switch (sort) {

        case "views":
          return (b.views ?? 0) - (a.views ?? 0);

        case "likes":
          return (b.likes ?? 0) - (a.likes ?? 0);

        case "oldest":
          return new Date(a.createdAt).getTime() -
                 new Date(b.createdAt).getTime();

        default:
          return new Date(b.createdAt).getTime() -
                 new Date(a.createdAt).getTime();

      }

    });

  return (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Recent Uploads
          </h2>

          <p className="text-slate-400 mt-2">
            Search, manage and organize your uploaded media.
          </p>

        </div>

        <div className="rounded-2xl bg-cyan-500/20 px-5 py-3 text-cyan-400 font-semibold">

          {filteredUploads.length} Files

        </div>

      </div>

      {/* ================= SEARCH BAR ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search uploads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-2xl bg-slate-950 border border-slate-800 px-5 py-4 outline-none focus:border-cyan-500"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-2xl bg-slate-950 border border-slate-800 px-5 py-4"
        >
          <option value="all">All Media</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="audio">Audio</option>
          <option value="document">Documents</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-2xl bg-slate-950 border border-slate-800 px-5 py-4"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="views">Most Viewed</option>
          <option value="likes">Most Liked</option>
        </select>

      </div>

      {/* ================= LIST ================= */}

      {filteredUploads.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center text-slate-400">

          No uploads found.

        </div>

      ) : (

        <div className="space-y-5">

          {filteredUploads.slice(0, 5).map((upload) => (

            <div
              key={upload.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 hover:border-cyan-500 transition-all duration-300 p-5"
            >

              <div className="flex gap-5">

                {getPreview(upload)}

                <div className="flex-1">

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-semibold">
                        {upload.title}
                      </h3>

                      <p className="text-slate-400 mt-2 line-clamp-2">

                        {upload.description || "No description"}

                      </p>

                    </div>

                    <span className="text-xs text-slate-500">

                      {new Date(upload.createdAt).toLocaleDateString()}

                    </span>

                  </div>

                  <div className="flex gap-6 mt-5 text-slate-400">

                    <span className="flex items-center gap-2">
                      <FaEye />
                      {upload.views ?? 0}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaHeart />
                      {upload.likes ?? 0}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaComment />
                      {upload.comments ?? 0}
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <Link
                      to={`/media/${upload.id}`}
                      className="rounded-xl bg-cyan-500 px-4 py-2 text-black font-semibold hover:bg-cyan-400 transition inline-flex items-center"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      View
                    </Link>

                    <Link
                      to={`/media/edit/${upload.id}`}
                      className="rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700 transition inline-flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(upload.id)}
                      className="rounded-xl bg-red-600 px-4 py-2 hover:bg-red-500 transition inline-flex items-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}
              

        </div>

      )}

      {/* ================= FOOTER ================= */}

      {filteredUploads.length > 5 && (

 <div className="mt-8 flex justify-center">

  <Link
    to="/library"
    className="rounded-2xl bg-slate-800 hover:bg-slate-700 transition px-6 py-3 font-semibold"
  >
    Open Media Library
  </Link>

</div>

)}

    </div>
  );
}

export default RecentUploads;  