import StatsCard from "./StatsCard";

export interface CardItem {
    title:string;
    value:string | number;
    hint:string;
}
type StatsGridProps = {
  cards:CardItem[]
}

const StatsGrid = ({cards}:StatsGridProps) => {
  
  return (
    <div className='max-w-10xl mx-auto px-4 mt-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
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