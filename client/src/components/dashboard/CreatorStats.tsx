interface Props {
  uploads: number;
  likes: number;
  views: number;
  comments: number;
}

function CreatorStats({
  uploads,
  likes,
  views,
  comments,
}: Props) {
  const stats = [
    ["Uploads", uploads],
    ["Likes", likes],
    ["Views", views],
    ["Comments", comments],
  ];

  return (
    <div className="rounded-2xl bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold">
        Analytics
      </h2>

      <div className="space-y-5">

        {stats.map(([label, value]) => (

          <div
            key={label}
            className="flex items-center justify-between border-b border-slate-800 pb-3"
          >

            <span className="text-slate-400">
              {label}
            </span>

            <span className="text-2xl font-bold">
              {value}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CreatorStats;