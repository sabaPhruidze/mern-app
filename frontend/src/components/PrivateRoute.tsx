import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateRoute = () => {
  const user = useAppSelector((state) => state.auth.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
