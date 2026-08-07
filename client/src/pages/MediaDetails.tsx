import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaEye,
  FaComment,
} from "react-icons/fa";

import {
  getMediaById,
  incrementView,
} from "../services/mediaService";

interface Media {
  id: number;
  title: string;
  description: string;
  image: string;
  fileName: string;
  fileType: string;
  mimeType: string;
  likes: number;
  views: number;
  createdAt: string;

  creator: {
    id: number;
    fullName: string;
    username: string;
  };
}

function MediaDetails() {
  const { id } = useParams();

  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await getMediaById(id!);

        console.log("MEDIA DATA:", data);

        setMedia(data);

        await incrementView(id!);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!media) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Media not found
      </div>
    );
  }

  const fileUrl =
    media.image ||
    `http://localhost:5000/uploads/${media.fileName}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto p-8">

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        <div className="mt-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">

          <div className="grid lg:grid-cols-2 gap-10 p-8">

            {/* LEFT SIDE */}

            <div>

              {media.fileType === "image" && (
                <img
                  src={fileUrl}
                  alt={media.title}
                  className="w-full rounded-2xl object-cover"
                />
              )}

              {media.fileType === "video" && (
                <video
                  controls
                  className="w-full rounded-2xl bg-black"
                >
                  <source
                    src={fileUrl}
                    type={media.mimeType}
                  />
                </video>
              )}

              {media.fileType === "audio" && (
                <div className="rounded-2xl bg-slate-800 p-8">
                  <audio controls className="w-full">
                    <source
                      src={fileUrl}
                      type={media.mimeType}
                    />
                  </audio>
                </div>
              )}

              {media.fileType === "document" && (
                <iframe
                  src={fileUrl}
                  title={media.title}
                  className="w-full h-[700px] rounded-2xl bg-white"
                />
              )}

            </div>

            {/* RIGHT SIDE */}

            <div>

              <h1 className="text-5xl font-bold">
                {media.title}
              </h1>

              <p className="mt-6 text-lg text-slate-300">
                {media.description || "No description"}
              </p>

              <div className="mt-8 flex gap-8 text-xl">

                <span className="flex items-center gap-2">
                  <FaHeart />
                  {media.likes}
                </span>

                <span className="flex items-center gap-2">
                  <FaEye />
                  {media.views}
                </span>

                <span className="flex items-center gap-2">
                  <FaComment />
                  0
                </span>

              </div>

              <div className="mt-10">

                <p className="text-slate-400">
                  Uploaded by
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                  {media.creator.fullName}
                </h2>

                <p className="text-cyan-400">
                  @{media.creator.username}
                </p>

                <p className="mt-6 text-slate-500">
                  Uploaded on{" "}
                  {new Date(media.createdAt).toLocaleDateString()}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MediaDetails;