import { useEffect } from "react";
import InsightsView from "../components/insights/InsightsView";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getGoals } from "../store/slices/goalSlices";
import { useNavigate } from "react-router-dom";

export type RangeType = "all" | "7d";
const Insights = () => {
  const user = useAppSelector((state) => state.auth.user);
  const goals = useAppSelector((state) => state.goals.goals);
  const isLoading = useAppSelector((state) => state.goals.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!goals.length && !isLoading) {
      dispatch(getGoals());
    }
  }, [user, goals.length, isLoading, dispatch, navigate]);

  return <InsightsView goals={goals} />;
};

export default Insights;
