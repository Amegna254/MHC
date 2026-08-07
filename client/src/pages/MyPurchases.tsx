import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/mediaService";

export default function MyPurchases() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Loading Purchases...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Purchases
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-slate-900 p-10 text-center text-slate-400">
            You haven't purchased anything yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-slate-900 p-6 flex gap-6 items-center"
              >
              {order.listing.media.fileType === "image" ? (
  <img
    src={`http://localhost:5000/uploads/${order.listing.media.fileName}`}
    alt={order.listing.media.title}
    className="w-36 h-36 rounded-2xl object-cover"
  />
) : order.listing.media.fileType === "video" ? (
  <video
    controls
    className="w-36 h-36 rounded-2xl object-cover"
  >
    <source
      src={`http://localhost:5000/uploads/${order.listing.media.fileName}`}
      type={order.listing.media.mimeType}
    />
  </video>
) : order.listing.media.fileType === "audio" ? (
  <audio controls className="w-36">
    <source
      src={`http://localhost:5000/uploads/${order.listing.media.fileName}`}
      type={order.listing.media.mimeType}
    />
  </audio>
) : (
  <div className="w-36 h-36 rounded-2xl bg-slate-800 flex items-center justify-center text-5xl">
    📄
  </div>
)}

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {order.listing.media.title}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {order.amount} {order.currency}
                  </p>

                  <p className="mt-2">
                    Status:
                    <span className="ml-2 text-cyan-400 font-semibold">
                      {order.status}
                    </span>
                  </p>

                  <p className="mt-2 text-slate-500">
                    Purchased on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <button
                  disabled={order.status !== "paid"}
                  className={`rounded-xl px-6 py-3 font-bold ${
                    order.status === "paid"
                      ? "bg-cyan-500 text-black hover:bg-cyan-400"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Download
                </button>

              </div>
            ))}
          </div>
        )}

        <Link
          to="/marketplace"
          className="inline-block mt-10 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400"
        >
          Browse Marketplace
        </Link>

      </div>
    </div>
  );
}