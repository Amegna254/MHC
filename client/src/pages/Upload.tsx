import { useState } from "react";
import { uploadMedia } from "../services/mediaService";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const data = await uploadMedia(formData);

      alert(data.message);

      setTitle("");
      setDescription("");
      setFile(null);

    } catch (error: any) {
      alert(error.response?.data?.message || "Upload failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl w-[450px] space-y-4"
      >
        <h2 className="text-3xl text-white font-bold text-center">
          Upload Artwork
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 rounded bg-slate-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 rounded bg-slate-800 text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          className="w-full text-white"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 py-3 rounded hover:bg-cyan-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}