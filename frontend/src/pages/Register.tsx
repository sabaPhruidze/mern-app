import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterSchema } from "../schemas/register";
import { registerSchema } from "../schemas/register";
import { inputData } from "../constants/registerInputs";
import { useNavigate } from "react-router-dom";

import { useAppDispatch,useAppSelector } from "../store/store";
import {register as registerUser ,reset} from '../store/slices/authSlice'
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
    const isError = useAppSelector(state => state.auth.isError);
    const isSuccess = useAppSelector(state => state.auth.isSuccess)
    const message = useAppSelector(state => state.auth.message)
  const {
    register,
    handleSubmit,
    setError, // for Server error
    formState: {errors},
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });
  useEffect(() => {
    if(isError) {
      setError("root", { 
        type: "server", 
        message: message // ეს მოდის ბექენდიდან
      });
    }
    if(isSuccess) {
      navigate('/')
    }
    return() => {
      dispatch(reset());
    }
  },[isError, isSuccess, message, navigate, dispatch, setError])
  const onSubmit = async (data: RegisterSchema) => {dispatch(registerUser(data))}
  
  const inputclasses =
    "border p-3 rounded-lg w-full outline-none focus:outline-none focus:border-cyan-800 focus:ring-0 transition";
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Registration
        </h1>
        {errors.root?.message && (
      <p className="text-center text-red-600 mt-1 mb-6">
    {errors.root.message}
      </p>)}
        <p className="text-center text-gray-500 mt-1 mb-6">
          Create a new account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {inputData.map((item) => (
            <div  key={item.id}>
              <input
                type={item.type}
                placeholder={item.placeholder}
                {...register(item.register)}
                className={inputclasses}
              />
              {errors[item.register] && (
                <p className="text-red-500 text-sm">
                {String(errors[item.register]?.message)}
              </p>
              )}
              
            </div>
          ))}
          <button className="bg-black text-white py-3 rounded font-bold hover:bg-gray-800 mt-2 cursor-pointer" disabled={isLoading} type="submit">
            {isLoading ? "Loading..." : 'Register'}
          
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
