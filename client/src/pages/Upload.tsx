import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { uploadMedia } from "../services/mediaService";
import Topbar from "../components/dashboard/Topbar";
import { useMarketplace } from "../context/MarketplaceContext";

export default function Upload() {
  const { addListing } = useMarketplace();
  const { token, user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isAuthenticated = Boolean(
    user && token && token !== "null" && token !== "undefined"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("digital-art");
  const [visibility, setVisibility] = useState("public");
  const [status, setStatus] = useState("published");
  const [stock, setStock] = useState(1);
  const [licenseType, setLicenseType] = useState("standard");
  const [createListing, setCreateListing] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("visibility", visibility);
    formData.append("status", status);
    formData.append("stock", String(stock));
    formData.append("licenseType", licenseType);
    formData.append("createListing", String(createListing));
    formData.append("file", file);

    try {
      const data = await uploadMedia(formData);

      if (data.listing) {
        addListing({
          id: data.listing.id,
          mediaId: data.media.id,
          title,
          creator: "My Profile",
          creatorSlug: "mhc-studio",
          price: data.listing.price,
          rating: 5,
          category: category === "digital-art" ? "Digital Art" : category === "music" ? "Music & Beats" : category === "house-plans" ? "House Plans" : category === "notes" ? "Notes" : category === "videos" ? "Videos" : "Photography",
          categorySlug: category,
          image: data.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
          likes: 0,
          views: 0,
          comments: 0,
        });
      }

      alert(data.message || "Upload successful and listing added!");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("digital-art");
      setVisibility("public");
      setStatus("published");
      setStock(1);
      setLicenseType("standard");
      setCreateListing(true);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error: any) {
      alert(error.response?.data?.message || "Upload failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-start py-12">
      <div className="w-[450px]">
        <Topbar />

        <div className="mt-4 mb-4">
          <h2 className="text-2xl font-semibold">Upload & List</h2>
          <p className="text-slate-400 text-sm mt-1">Upload your file and add it to the marketplace as a public listing.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-xl space-y-4">
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

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Price"
              className="w-full p-3 rounded bg-slate-800 text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 text-white"
            >
              <option value="digital-art">Digital Art</option>
              <option value="music">Music & Beats</option>
              <option value="videos">Videos</option>
              <option value="notes">Notes</option>
              <option value="house-plans">House Plans</option>
              <option value="photography">Photography</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 text-white"
            >
              <option value="public">Public Listing</option>
              <option value="private">Private Draft</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 text-white"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="number"
              placeholder="Stock"
              className="w-full p-3 rounded bg-slate-800 text-white"
              value={stock}
              min={1}
              onChange={(e) => setStock(Number(e.target.value))}
            />
            <select
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 text-white"
            >
              <option value="standard">Standard License</option>
              <option value="extended">Extended License</option>
            </select>
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={createListing}
              onChange={(e) => setCreateListing(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-500"
            />
            Create a marketplace listing for this upload
          </label>

          <input
            ref={fileInputRef}
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
            className="w-full bg-cyan-500 py-3 rounded hover:bg-cyan-600 transition"
          >
            Upload & List
          </button>
        </form>
      </div>
    </div>
  );
}