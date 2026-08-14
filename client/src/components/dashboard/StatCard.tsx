import {
  FaImage,
  FaVideo,
  FaMusic,
  FaFileAlt,
} from "react-icons/fa";

interface Props {
  title: string;
  value: number;
}

function getIcon(title: string) {
  switch (title) {
    case "Images":
      return <FaImage />;
    case "Videos":
      return <FaVideo />;
    case "Audio":
      return <FaMusic />;
    case "Documents":
      return <FaFileAlt />;
    default:
      return <FaFileAlt />;
  }
}

function StatCard({ title, value }: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-slate-400 text-lg font-medium">
            {title}
          </h3>

          <h2 className="text-5xl font-bold text-white mt-3">
            {value}
          </h2>

          <p className="text-cyan-400 text-sm mt-4">
            Total uploaded
          </p>
        </div>

        <div className="text-5xl text-cyan-400 flex items-center justify-center">
          {getIcon(title)}
        </div>

      </div>
    </div>
  );
}

export default StatCard;