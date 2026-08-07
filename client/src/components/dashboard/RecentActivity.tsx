import {
  FaHeart,
  FaCommentDots,
  FaEye,
  FaUpload,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUpload />,
    color: "text-cyan-400",
    text: "You uploaded a new media file.",
    time: "Just now",
  },
  {
    icon: <FaEye />,
    color: "text-green-400",
    text: "One of your uploads received a new view.",
    time: "15 min ago",
  },
  {
    icon: <FaHeart />,
    color: "text-pink-400",
    text: "Someone liked your upload.",
    time: "1 hour ago",
  },
  {
    icon: <FaCommentDots />,
    color: "text-yellow-400",
    text: "A new comment was added.",
    time: "Today",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex gap-4 items-start border-b border-slate-800 pb-4 last:border-none"
          >

            <div
              className={`mt-1 text-xl ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div className="flex-1">

              <p className="text-slate-200">
                {activity.text}
              </p>

              <span className="text-xs text-slate-500">
                {activity.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}