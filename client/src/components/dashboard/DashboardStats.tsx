import {
  FaCloudUploadAlt,
  FaEye,
  FaHeart,
  FaCommentDots,
  FaChartLine,
} from "react-icons/fa";

import StatCard from "./StatCard";

interface Props {
  uploads: number;
  views: number;
  likes: number;
  comments: number;
}

function DashboardStats({
  uploads,
  views,
  likes,
  comments,
}: Props) {

  const engagement =
    views > 0
      ? ((likes / views) * 100).toFixed(1)
      : "0.0";

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mt-8">

      <StatCard
        title="Uploads"
        value={uploads}
        trend="+12%"
        icon={<FaCloudUploadAlt />}
        color="cyan"
      />

      <StatCard
        title="Views"
        value={views}
        trend="+18%"
        icon={<FaEye />}
        color="green"
      />

      <StatCard
        title="Likes"
        value={likes}
        trend="+9%"
        icon={<FaHeart />}
        color="pink"
      />

      <StatCard
        title="Comments"
        value={comments}
        trend="+4%"
        icon={<FaCommentDots />}
        color="yellow"
      />

      <StatCard
        title="Engagement"
        value={`${engagement}%`}
        trend="+6%"
        icon={<FaChartLine />}
        color="purple"
      />

    </div>

  );
}

export default DashboardStats;