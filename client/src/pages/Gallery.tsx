import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMedia } from "../services/mediaService";
import Topbar from "../components/dashboard/Topbar";

interface Media {
  id: number;
  title: string;
  description: string;
  fileName: string;
  filePath: string;
  fileType: string;
  mimeType: string;
  uploadedBy: number;
  createdAt: string;
}

function Gallery() {
  const { user } = useAuth();

  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await getMedia();
        console.log(data);
        setMedia(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">

      <Topbar />

      <div className="mt-4 mb-6">
        <h1 className="text-3xl font-bold">
          My Gallery
        </h1>
      </div>

      {media.length === 0 ? (
        <div className="text-center text-slate-400">
          No uploads yet.
        </div>
      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {media.map((item) => (

            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-lg"
            >

              {/* IMAGE */}

              {item.fileType === "image" && (

                <img
                  src={`http://localhost:5000/uploads/${item.fileName}`}
                  alt={item.title}
                  className="h-52 w-full cursor-pointer object-cover"
                  onClick={() => setSelectedMedia(item)}
                />

              )}

              {/* VIDEO */}

              {item.fileType === "video" && (

                <video
                  controls
                  className="h-52 w-full bg-black object-cover"
                >
                  <source
                    src={`http://localhost:5000/uploads/${item.fileName}`}
                    type={item.mimeType}
                  />
                </video>

              )}

              {/* AUDIO */}

              {item.fileType === "audio" && (

                <div className="flex h-52 items-center justify-center bg-slate-800 p-4">

                  <audio controls className="w-full">
                    <source
                      src={`http://localhost:5000/uploads/${item.fileName}`}
                      type={item.mimeType}
                    />
                  </audio>

                </div>

              )}

              {/* DOCUMENT */}

              {item.fileType === "document" && (

                <div
                  onClick={() => setSelectedMedia(item)}
                  className="flex h-52 cursor-pointer items-center justify-center bg-slate-800 text-7xl"
                >
                  📄
                </div>

              )}

              <div className="p-4">

                <h2 className="font-semibold">
                  {item.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                  {item.description}
                </p>

                <button
                  onClick={() => setSelectedMedia(item)}
                  className="mt-4 w-full rounded-xl bg-cyan-500 py-2 font-semibold text-black hover:bg-cyan-400"
                >
                  View
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* MODAL */}

      {selectedMedia && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedMedia(null)}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-2xl bg-slate-900 p-6"
          >

            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700"
            >
              ✕
            </button>

            {/* IMAGE */}

            {selectedMedia.fileType === "image" && (

              <img
                src={`http://localhost:5000/uploads/${selectedMedia.fileName}`}
                alt={selectedMedia.title}
                className="max-h-[70vh] w-full rounded object-contain"
              />

            )}

            {/* VIDEO */}

            {selectedMedia.fileType === "video" && (

              <video
                controls
                className="max-h-[70vh] w-full"
              >
                <source
                  src={`http://localhost:5000/uploads/${selectedMedia.fileName}`}
                  type={selectedMedia.mimeType}
                />
              </video>

            )}

            {/* AUDIO */}

            {selectedMedia.fileType === "audio" && (

              <div className="py-20">

                <audio controls className="w-full">
                  <source
                    src={`http://localhost:5000/uploads/${selectedMedia.fileName}`}
                    type={selectedMedia.mimeType}
                  />
                </audio>

              </div>

            )}

            {/* DOCUMENT */}

            {selectedMedia.fileType === "document" && (

              <iframe
                src={`http://localhost:5000/uploads/${selectedMedia.fileName}`}
                title={selectedMedia.title}
                className="h-[70vh] w-full rounded bg-white"
              />

            )}

            <div className="mt-6">

              <h2 className="text-2xl font-bold">
                {selectedMedia.title}
              </h2>

              <p className="mt-3 text-slate-300">
                {selectedMedia.description}
              </p>

              <p className="mt-4 text-sm text-slate-500">
                Uploaded on{" "}
                {new Date(selectedMedia.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Gallery;