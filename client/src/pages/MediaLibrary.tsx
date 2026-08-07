import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getLibrary } from "../services/libraryService";

export default function MediaLibrary() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = async () => {
    try {
      const data = await getLibrary();
      setUploads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Library...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <div className="mt-8">

          <h1 className="text-5xl font-bold">
            Media Library
          </h1>

          <p className="text-slate-400 mt-2">
            Browse and manage all your uploads.
          </p>

        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {uploads.length === 0 ? (

            <div className="col-span-full text-center text-slate-400 py-20">
              No uploads found.
            </div>

          ) : (

            uploads.map((item: any) => (

              <div
                key={item.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
              >

                <div className="h-48 bg-slate-800 flex items-center justify-center">

                  {item.fileType === "image" ? (

                    <img
                      src={`http://localhost:5000/uploads/${item.fileName}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <span className="text-slate-400">
                      {item.fileType.toUpperCase()}
                    </span>

                  )}

                </div>

                <div className="p-5">

                  <h2 className="font-bold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                    {item.description || "No description"}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  );
}