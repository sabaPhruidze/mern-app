// in order to use it for reduxjs as well as for register and login page, so component change will be immediate on header as well as where it is necessary
import api from "../../api/api";
import type { RegisterSchema } from "../../schemas/register";
import type { LoginSchema } from "../../schemas/login";

const register = async (userData: RegisterSchema) => {
  const { data } = await api.post("/api/users/register", userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const login = async (userData: LoginSchema) => {
  const { data } = await api.post("/api/users/login", userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };
export default authService;
