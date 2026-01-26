type StatsCardProps = {
    title: string;
    value: string | number;
    hint?: string;
}

const StatsCard = ({title,value,hint}: StatsCardProps) => {
  return (
    <div>
        <p>{title}</p>
        <p>{value}</p>
        
    </div>
  )
}

export default StatsCard