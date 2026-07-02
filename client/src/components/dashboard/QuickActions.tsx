function QuickActions() {
  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button className="bg-cyan-500 rounded-lg py-3 hover:bg-cyan-600">
          Upload Artwork
        </button>

        <button className="bg-cyan-500 rounded-lg py-3 hover:bg-cyan-600">
          Upload Video
        </button>

        <button className="bg-cyan-500 rounded-lg py-3 hover:bg-cyan-600">
          Upload Audio
        </button>

        <button className="bg-cyan-500 rounded-lg py-3 hover:bg-cyan-600">
          Upload Document
        </button>

      </div>
    </div>
  );
}

export default QuickActions;