import { useEffect, useMemo,useState,useRef } from "react"
import StatsGrid from "../constants/insights/StatsGrid"
import TopDaysList from "../constants/insights/TopDaysList"
import { useAppDispatch, useAppSelector } from "../store/store"
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
    // eslint-disable-next-line react-hooks/purity
    const nowRef = useRef(Date.now()); // by this I am telling eslint That I know what I'am doing here 
    useEffect(() => {
    if(!user ) {
    navigate('/login')
    return;
    }else {
   dispatch(getGoals());
    }
    },[user,navigate,dispatch])

    const stats = useMemo(() => {
        const safelGoals = goals || [];//array of Goal object
        const q = query.trim().toLowerCase();//string what's written inside the searchbar
        const sevenDaysAgo = new Date(nowRef.current - 7 * 24 * 60 * 60 * 1000);// Since it is miliseconds .It is a date object
        // array of goal objects
        const filteredGoals = safelGoals.filter((goal) => {
            const textOk = q ? goal.text.toLowerCase().includes(q) : true; 
            const dateOk = range ==='7d' ? new Date(goal.createdAt) >= sevenDaysAgo : true;
            return textOk && dateOk;//boolean
        })
            const total = filteredGoals.length;
            // OBJECT { "YYYY-MM-DD": count }
            const byDate = filteredGoals.reduce((acc:Record<string,number>,curr) => {
                const dateKey = curr.createdAt.slice(0,10);// String "YYYY-MM-DD"
                acc[dateKey] = (acc[dateKey] || 0) + 1;
                return acc;
            },{})
            // ARRAY of objects [{date, count}]
            const topDays = Object.entries(byDate)
            .sort((a,b) => b[1] - a[1])
            .slice(0,5)
            .map(([date,count]) => ({date,count}))

            const todayKey = new Date().toISOString().slice(0,10);
            const today = byDate[todayKey] || 0;
            
            const last7Count = safelGoals.filter((goal) => new Date(goal.createdAt) >= sevenDaysAgo).length;
            return {total,today,topDays,last7Count}
        
       
    },[goals,query,range])
    const cards: CardItem[] = [
            { title: "Total Goals", value: stats.total, hint: "Current view" },
            { title: "Today", value: stats.today, hint: "In current view" },
            { title: "Last 7 Days", value: stats.last7Count, hint: "All goals" },
            { title: "Top Day", value: stats.topDays[0]?.count || 0, hint: "Most active" },
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