import { useEffect, useState } from "react";
import { getMedia } from "../services/mediaService";

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
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);

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
    <div className="min-h-screen bg-slate-950 text-white px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        MHC Gallery
      </h1>

      {media.length === 0 ? (
        <div className="text-center text-slate-400 text-xl">
          No uploads yet.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition duration-300"
            >
              <img
                src={`http://localhost:5000/uploads/${item.fileName}`}
                alt={item.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">{item.title}</h2>

                <p className="text-slate-400 mt-2">
                  {item.description}
                </p>

                <p className="text-sm text-slate-500 mt-4">
                  Uploaded on{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => setSelectedImage(item)}
                  className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg transition"
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
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-slate-900 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full text-2xl font-bold shadow-lg"
            >
              ×
            </button>

            <img
              src={`http://localhost:5000/uploads/${selectedImage.fileName}`}
              alt={selectedImage.title}
              className="w-full max-h-[65vh] object-contain bg-black rounded-t-2xl"
            />

            <div className="p-6">
              <h2 className="text-3xl font-bold">
                {selectedImage.title}
              </h2>

              <p className="text-slate-400 mt-4">
                {selectedImage.description}
              </p>

              <p className="text-slate-500 mt-4">
                Uploaded on{" "}
                {new Date(selectedImage.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;