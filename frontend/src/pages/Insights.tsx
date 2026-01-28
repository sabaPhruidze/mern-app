import { useEffect, useMemo,useState } from "react"
import StatsGrid from "../constants/insights/StatsGrid"
import TopDaysList from "../constants/insights/TopDaysList"
import { useAppDispatch, useAppSelector } from "../store/store"
import type { Goal } from "../store/slices/goalSlices"
import type { CardItem } from "../constants/insights/StatsGrid"
import { getGoals } from "../store/slices/goalSlices"
import { useNavigate } from "react-router-dom"
import InsightsFilterBar from "../constants/insights/InsightsFilterBar"

export type RangeType = "all" | "7d";
const Insights = () => {
    const user = useAppSelector(state => state.auth.user)
    const goals = useAppSelector(state => state.goals.goals)
    const navigate = useNavigate();
    const dispatch= useAppDispatch();
    const [query,setQuery] = useState<string>('');
    const [range,setRange] = useState<RangeType>('all')
    useEffect(() => {
    if(!user ) {
    navigate('/login')
    return;
    }else {
   dispatch(getGoals());
    }
    },[user,navigate,dispatch])
    const stats = useMemo(() => {
        const total = goals?.length || 0;//retrieved number of how many we have
        const byDate=(goals || []).reduce((acc:Record<string,number>,curr:Goal) => {
            const d= String(curr.createdAt || "").slice(0,10) ||"unknown";//"2026-01-26T12:34:56.789Z" it will be like this and will will slice first 10 symbol
            acc[d] = (acc[d] || 0) + 1;//d means date key here
            return acc; // acc["2026-01-26"] = (undefined || 0) + 1 = 1 than  acc["2026-01-26"] = (1 || 0) + 1 = 2
        },{});
        const topDays = Object.entries(byDate)
        .filter(([k]) => k !== "unknown")//key
        .sort((a,b) => b[1] -a[1])
        .slice(0,5)
        .map(([date,count]) => ({date,count}));

        const todayKey = new Date().toISOString().slice(0,10);//returns UTC time. 2026-01-26T10:20:30.000Z for example
        const today = byDate[todayKey] || 0
        return {total,today,topDays}
    },[goals])
    const cards: CardItem[] = [
            { title: "Total Goals", value: stats.total, hint: "All time" },
            { title: "Today", value: stats.today, hint: "Created today" },
            { title: "Top Day", value: stats.topDays[0]?.date || "-", hint: "Most active" },
            { title: "Top Count", value: stats.topDays[0]?.count || 0, hint: "Goals in that day" },
        ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Quick analytics based on your goals. </p>
        <InsightsFilterBar
        query={query}
        range={range}
        onQueryChange={setQuery}
        onRangeChange={setRange}
        />
        <StatsGrid cards={cards} />
        <TopDaysList items={stats.topDays} />
    </div>
  )
}

export default Insights