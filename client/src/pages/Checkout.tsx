import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getListingById,
  createOrder,
} from "../services/mediaService";

export default function Checkout() {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const loadListing = async () => {
      try {
        if (!listingId) return;

        const data = await getListingById(listingId);
        setListing(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [listingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">
          Loading Checkout...
        </h1>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Listing not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <Link
          to={`/marketplace/item/${listing.id}`}
          className="text-cyan-400 hover:underline"
        >
          ← Back to Listing
        </Link>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="rounded-3xl bg-slate-900 p-6">

            {listing.fileType === "image" && (
              <img
                src={listing.image}
                alt={listing.title}
                className="rounded-2xl w-full"
              />
            )}

            {listing.fileType === "video" && (
              <video controls className="rounded-2xl w-full">
                <source
                  src={listing.image}
                  type={listing.mimeType}
                />
              </video>
            )}

            {listing.fileType === "audio" && (
              <audio controls className="w-full mt-6">
                <source
                  src={listing.image}
                  type={listing.mimeType}
                />
              </audio>
            )}

            {listing.fileType === "document" && (
              <iframe
                src={listing.image}
                title={listing.title}
                className="rounded-2xl w-full h-[600px] bg-white"
              />
            )}

            <h1 className="mt-6 text-3xl font-bold">
              {listing.title}
            </h1>

            <p className="mt-4 text-slate-400">
              {listing.description}
            </p>

          </div>

          {/* RIGHT */}
          <div className="rounded-3xl bg-slate-900 p-8">

            <h2 className="text-3xl font-bold">
              Checkout
            </h2>

            <div className="mt-8 space-y-6">

              <div className="rounded-2xl bg-slate-950 p-5">
                <p className="text-slate-400">
                  Price
                </p>

                <h3 className="mt-2 text-4xl font-bold text-cyan-400">
                  {listing.price} {listing.currency}
                </h3>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  M-Pesa Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="2547XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={async () => {
                  if (!phone.trim()) {
                    alert("Please enter your M-Pesa phone number.");
                    return;
                  }

                  try {
                    const order = await createOrder(listing.id);

                    console.log("Order created:", order);

                    alert("Order created successfully!");

                    // Redirect to My Purchases
                    navigate("/purchases");

                  } catch (error) {
                    console.error(error);
                    alert("Failed to create order.");
                  }
                }}
                className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-black hover:bg-cyan-400 transition"
              >
                Pay with M-Pesa
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}