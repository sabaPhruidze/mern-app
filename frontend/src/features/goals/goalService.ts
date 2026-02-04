// Evry time on server request This functions will pass down token
import api from "../../api/api";
export type Goalpayload = { text: string };

const createGoal = async (goalData: Goalpayload) => {
  const { data } = await api.post("/api/goals", goalData);
  return data;
};

const getGoals = async () => {
  const { data } = await api.get("/api/goals");
  return data;
};

const updateGoals = async (goalId: string, goalData: { text: string }) => {
  const { data } = await api.put(`/api/goals/${goalId}`, goalData);
  return data;
};

const deleteGoal = async (goalId: string) => {
  const { data } = await api.delete(`/api/goals/${goalId}`);
  return data;
};

const goalServices = { createGoal, getGoals, updateGoals, deleteGoal };
export default goalServices;
