// Evry time on server request This functions will pass down token
import api from "../../api/api";
export type Goalpayload = {text:string};

const createGoal = async(goalData:Goalpayload) => {
   const {data} = await api.post('/goals',goalData);
   return data //server's real response
}
const getGoals = async() => {
  const {data} = await api.get('/goals');
  return data 
}
const deleteGoal = async(goalId:string) => {
   const {data} = await api.delete(`/goals/${goalId}`);
   return data
}

const goalServices = {
    createGoal,getGoals,deleteGoal
}
export default goalServices