interface Props {
  title: string;
  value: number;
}

function StatCard({ title, value }: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-slate-400">
        {title}
      </h3>

      <p className="text-4xl font-bold text-cyan-400 mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;