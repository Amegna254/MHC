import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  name: string;
  uploads: number;
}

function WelcomeCard({ name, uploads }: Props) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 text-white shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-4xl font-bold">
            Welcome back, {name} 👋
          </h2>

          <p className="mt-3 text-cyan-100 text-lg">
            Continue building your creative portfolio.
          </p>

          <p className="mt-6 text-5xl font-bold">
            {uploads}
          </p>

          <p className="text-cyan-100">
            Total Uploads
          </p>
        </div>

        <Link
          to="/upload"
          className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-slate-900 hover:bg-slate-100 transition"
        >
          <FaArrowUp />
          Upload New Media
        </Link>

      </div>

    </div>
  );
}

export default WelcomeCard;