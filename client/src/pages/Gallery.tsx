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
  uploadedBy: number;
  createdAt: string;
}

function Gallery() {
  const { user } = useAuth();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await getMedia();
        console.log("Media from API:", data);
        setMedia(data);
      } catch (error) {
        console.error("Failed to load media:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-2xl">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <Topbar />

      <div className="mt-4 mb-4">
        <h1 className="text-2xl font-semibold">Gallery</h1>
      </div>

      {media.length === 0 ? (
        <div className="text-center text-slate-400 text-lg">No uploads yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((item) => (
            <div key={item.id} className="bg-slate-900 rounded-xl overflow-hidden relative">
              <img
                src={`http://localhost:5000/uploads/${item.fileName}`}
                alt={item.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setSelectedImage(item)}
              />

              <div className="p-3 flex items-center justify-between">
                <h2 className="text-sm font-medium">{item.title}</h2>

                <button
                  onClick={() => setSelectedImage(item)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-xs px-3 py-1 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-slate-900 rounded-lg w-full max-w-3xl max-h-[85vh] overflow-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-700 text-white w-8 h-8 rounded-full"
            >
              ×
            </button>

            <img
              src={`http://localhost:5000/uploads/${selectedImage.fileName}`}
              alt={selectedImage.title}
              className="w-full max-h-[60vh] object-contain rounded-md"
            />

            <div className="mt-3">
              <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-slate-400 text-sm mt-2">{selectedImage.description}</p>
              )}
              <p className="text-slate-500 text-xs mt-2">{new Date(selectedImage.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;