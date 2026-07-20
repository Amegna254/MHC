import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Listing {
  id: number;
  mediaId: number;
  title: string;
  description: string;
  image: string;
  fileType: string;
  mimeType: string;
  category: string;
  price: number;
  currency: string;
  creator: string;
  creatorSlug: string;
  views: number;
  likes: number;
  comments: any[];
  isForSale: boolean;
}

export default function MarketplaceItem() {
  const { id } = useParams();

  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    loadListing();
  }, [id]);

  async function loadListing() {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/media/${id}`
      );

      setListing(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <Link
        to="/marketplace"
        className="text-cyan-400"
      >
        ← Back
      </Link>

      <h1 className="text-4xl font-bold mt-6">
        {listing.title}
      </h1>

      <p className="text-slate-400 mb-8">
        by {listing.creator}
      </p>

      {listing.fileType === "image" && (
        <img
          src={listing.image}
          alt={listing.title}
          className="rounded-xl w-full max-h-[600px] object-contain"
        />
      )}

      {listing.fileType === "video" && (
        <video controls className="w-full rounded-xl">
          <source
            src={listing.image}
            type={listing.mimeType}
          />
        </video>
      )}

      {listing.fileType === "audio" && (
        <audio controls className="w-full">
          <source
            src={listing.image}
            type={listing.mimeType}
          />
        </audio>
      )}

      {listing.fileType === "document" && (
        <a
          href={listing.image}
          target="_blank"
          rel="noreferrer"
          className="bg-cyan-500 px-6 py-3 rounded-xl inline-block text-black"
        >
          Open Document
        </a>
      )}

      <p className="mt-8 text-lg">
        {listing.description}
      </p>

      <div className="mt-10 flex gap-8 text-slate-300">
        <span>❤️ {listing.likes}</span>
        <span>👁 {listing.views}</span>
        <span>💬 {listing.comments.length}</span>
      </div>

      <div className="mt-10">
        <span className="text-3xl font-bold">
          {listing.currency} {listing.price}
        </span>
      </div>
    </div>
  );
}