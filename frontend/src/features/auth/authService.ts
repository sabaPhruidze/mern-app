// in order to use it for reduxjs as well as for register and login page, so component change will be immediate on header as well as where it is necessary
import axios from "axios";
const API_URL = 'http://localhost:3000/api/users/';
import type { RegisterSchema } from "../../schemas/register";
import type { LoginSchema } from "../../schemas/login";

const register = async(userData:RegisterSchema) => {
    const response = await axios.post(API_URL + 'register',userData);
    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
return response.data
}
const login = async (userData:LoginSchema) => {
    const response = await axios.post(API_URL + 'login',userData);
    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data));

    }
    return response.data
}
const logout = () => {
    localStorage.removeItem('user')
}
const authService = {
    register,login,logout
}
export default authService