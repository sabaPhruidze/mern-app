import StatsCard from "./statsCard"

const StatsGrid = () => {
  return (
    <div className='max-w-3xl mx-auto px-4 mt-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatsCard title="Total Goals" value={12} hint="All time"/>
        <StatsCard title="Today" value={2} hint="Created today" />
        <StatsCard title="Last 7 Days" value={6} hint="Weekly activity" />
        <StatsCard title="Top Day" value="2026-01-26" hint="Most active" />
        </div>
    </div>
  )
}

export default StatsGrid