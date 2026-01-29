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
const updateGoals = async(goalId:string,goalData:{text:string}) => {
   const response = await api.put(`/goals/${goalId}`,goalData);
   return response.data
}
const deleteGoal = async(goalId:string) => {
   const {data} = await api.delete(`/goals/${goalId}`);
   return data
}

const goalServices = {
    createGoal,getGoals,updateGoals,deleteGoal
}
export default goalServices