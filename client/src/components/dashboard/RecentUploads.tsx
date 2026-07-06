interface Upload {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  createdAt: string;
}

interface Props {
  uploads: Upload[];
}

function RecentUploads({ uploads }: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Uploads
      </h2>

      {uploads.length === 0 ? (
        <p className="text-slate-400">
          No uploads yet.
        </p>
      ) : (
        <div className="space-y-4">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="flex items-center gap-4 border-b border-slate-800 pb-4"
            >
              <img
                src={`http://localhost:5000/uploads/${upload.fileName}`}
                alt={upload.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {upload.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {upload.description}
                </p>

                <p className="text-slate-500 text-xs mt-1">
                  {new Date(upload.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentUploads;