import type { RangeType } from "../../pages/Insights"

type InsightsFilterBarProps = {
    query:string;
    range:RangeType;
    onQueryChange:(v:string) => void;
    onRangeChange:(v:RangeType) => void;
}

const InsightsFilterBar = ({query,range,onQueryChange,onRangeChange}: InsightsFilterBarProps) => {
  return (
    <div className="ma-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <input type="search" value={query} onChange={e => onQueryChange(e.target.value)} placeholder="Search goals..." className="w-full sm:max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 foucs:ring-gray-200"/>
                <div className="flex items-center gap-2">
                    <button
                    onClick={() => onRangeChange('all')}
                    className={`px-3 py-2 rounded-lg text-sm border cursor-pointer ${
                        range ==='all' 
                        ?
                        "bg-gray-900 text-white border-gray-900"
                        :
                        "bg-white text-gray-800 border-gray-200"
                    }`}
                    >
                        All
                    </button>
                    <button
                    onClick={() => onRangeChange('7d')}
                    className={`px-3 py-2 rounded-lg text-sm border cursor-pointer ${
                        range ==='7d'
                        ?
                        "bg-gray-900 text-white border-gray-900"
                        :
                        "bg-white text-gray-800 border-gray-200"
                    }`}
                    >
                        Last 7 days
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InsightsFilterBar