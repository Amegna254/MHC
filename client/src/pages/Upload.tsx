function Upload() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="bg-slate-900 p-10 rounded-xl w-[500px]">

        <h1 className="text-3xl font-bold mb-8">
          Upload Media
        </h1>

        <input
          type="file"
          className="w-full bg-slate-800 p-3 rounded"
        />

        <button
          className="mt-6 w-full bg-cyan-500 py-3 rounded hover:bg-cyan-600"
        >
          Upload
        </button>

      </div>
    </div>
  );
}

export default Upload;