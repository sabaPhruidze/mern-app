import { useMemo } from "react"
import StatsGrid from "../constants/insights/StatsGrid"
import TopDaysList from "../constants/insights/TopDaysList"
import { useAppSelector } from "../store/store"
import type { Goal } from "../store/slices/goalSlices"


const Insights = () => {
    const goals = useAppSelector(state => state.goals.goals)
    const stats = useMemo(() => {
        const total = goals?.length || 0;
        const byDate=(goals || []).reduce((acc:Record<string,number>,g:Goal) => {
            const d= String(g.createdAt || "").slice(0,10) ||"unknown";
            acc[d] = (acc[d] || 0) + 1;
            return acc;
        },{});
        const topDays = Object.entries(byDate)
        .filter(([k]) => k !== "unknown")
        .sort((a,b) => b[1] -a[1])
        .slice(0,5)
        .map(([date,count]) => ({date,count}));

        const todayKey = new Date().toISOString().slice(0,10);
        const today = byDate[todayKey] || 0
        return {total,today,topDays}
    },[goals])
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Quick analytics based on your goals. </p>
        <StatsGrid/>
        <TopDaysList/>
    </div>
  )
}

export default Insights