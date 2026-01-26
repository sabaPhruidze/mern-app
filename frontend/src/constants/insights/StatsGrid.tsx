import StatsCard from "./statsCard"

interface CardItem {
    title:string;
    value:string | number;
    hint:string;
}

const StatsGrid = () => {
     const cards: CardItem[] = [
    { title: "Total Goals", value: 12, hint: "All time" },
    { title: "Today", value: 2, hint: "Created today" },
    { title: "Last 7 Days", value: 6, hint: "Weekly activity" },
    { title: "Top Day", value: "2026-01-26", hint: "Most active" },
  ];
  return (
    <div className='max-w-3xl mx-auto px-4 mt-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {cards.map((item) => (
            <StatsCard 
            key={item.title} 
            title={item.title} 
            value={item.value} 
            hint={item.hint} />
        ))}
        
        </div>
    </div>
  )
}

export default StatsGrid