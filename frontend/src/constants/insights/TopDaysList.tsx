type TopdayItem = {
    date:string;
    count: number;
}

const TopDaysList = () => {
    const items : TopdayItem[] = [
        {date:"2026-01-26", count:4},
        {date: "2026-01-25", count:3},
        {date:"2026-01-22", count:2}
    ]
  return (
   <div className="max-w-3xl mx-auto px-4 mt-6">
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col  gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-base font-semibold text-gray-800">Top Days</h2>
            <p className="text-xs text-gray-500">Most created goals</p>
        </div>
        <div className="mt-4 space-y-3">
            {items.map((item) => (
                <div key={item.count} className="flex items-center justify-between gap-4 border border-gray-100 rounded-lg px-3 py-2">
                    <p>{item.date}</p>
                    <p>{item.count}</p>
                </div>
            ))}
        </div>
    </div>
   </div>
  )
}

export default TopDaysList