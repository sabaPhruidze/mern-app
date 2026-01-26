import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../store/store";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import { getGoals,reset } from "../store/slices/goalSlices";
import StatsGrid from "../constants/insights/StatsGrid";
import TopDaysList from "../constants/insights/TopDaysList";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const {goals,isLoading,isError,message} = useAppSelector(state => state.goals);
  
useEffect(() => {
  if (!user) {
    navigate("/login");
  } else {
    dispatch(getGoals());
  }

  return () => {
    dispatch(reset());
  };
}, [user, navigate, dispatch]);

useEffect(() => {
  if (isError) console.log(message);
}, [isError, message]);


  if(isLoading) {
    return <div className="text-center mt-20 text-2xl animate-pulse">Loading ...</div>
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto p5">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Hi {user && user.name}</h1>
        <p className="text-gray-500 text-lg">Goals Dashboard</p>
      </section>
      <GoalForm/>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.length > 0 ? (
          goals.map((goal) => <GoalItem key={goal._id } goal={goal}/>)
        ): (
          <div className="col-span-2 text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <h3 className="text-gray-400 text-lg">No goals added yet</h3>
          </div>
        )}
        
        <StatsGrid/>
        <TopDaysList/>
      </section>
    </div>
  );
};

export default Dashboard;
