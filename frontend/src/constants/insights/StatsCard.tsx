type StatsCardProps = {
    title: string;
    value: string | number;
    hint?: string;
}

const StatsCard = ({title,value,hint}: StatsCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition min-w-40">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-extrabold text-gray-800 mt-2">{value}</p>
        {hint ? <p className="text-xs text-gray-400 mt-2">{hint}</p> : null}
    </div>
  )
}

export default StatsCard