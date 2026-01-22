import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {loginSchema,type LoginSchema} from '../schemas/login'
import { loginInputs } from "../constants/loginInputs";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
    setError
  } = useForm<LoginSchema>({resolver:zodResolver(loginSchema)})
  const onSubmit = async(data:LoginSchema) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login",data)
      if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data));
        navigate('/')
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Login failed'
        setError('root',{message})
      }
    }
  }
  const inputclasses =
    "border p-3 rounded-lg w-full outline-none focus:outline-none focus:border-cyan-800 focus:ring-0 transition";
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Welcome back!
        </p>
        {errors.root && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {errors.root.message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {loginInputs.map((item) => (
            <div key={item.id}>
              <input type={item.type} placeholder={item.placeholder} {...register(item.name)} className={`${inputclasses} ${errors[item.name] ? 'border-red-500' : ''}`} />
              {errors[item.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[item.name]?.message}</p>
              )}
            </div>
          ))}
          <button type="submit" disabled={isSubmitting} className="bg-black text-white py-3 rounded font-bold hover:bg-gray-800 cursor-pointer disabled:bg-gray-400">
            {isSubmitting ? 'logging in...' :'Login'}
          </button>
        </form>
      </div>
    </div>
  )
};

export default Login;
