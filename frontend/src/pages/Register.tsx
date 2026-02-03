import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterSchema } from "../schemas/register";
import { registerSchema } from "../schemas/register";
import { inputData } from "../constants/registerInputs";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { register as registerUser, reset } from "../store/slices/authSlice";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isError = useAppSelector((state) => state.auth.isError);
  const isSuccess = useAppSelector((state) => state.auth.isSuccess);
  const message = useAppSelector((state) => state.auth.message);
  const {
    register,
    handleSubmit,
    setError, // for Server error
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });
  useEffect(() => {
    if (isError) {
      setError("root", {
        type: "server",
        message: message, // ეს მოდის ბექენდიდან
      });
    }
    if (isSuccess) {
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch, setError]);
  const onSubmit = async (data: RegisterSchema) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Registration
        </h1>
        {errors.root?.message && (
          <p className="text-center text-red-600 mt-1 mb-6">
            {errors.root.message}
          </p>
        )}
        <p className="auth-title">Create a new account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {inputData.map((item) => (
            <div key={`${item.id}-${item.placeholder}`}>
              <input
                type={item.type}
                placeholder={item.placeholder}
                {...register(item.register)}
                className={`auth-input ${errors[item.register] ? "border-red-500" : ""}`}
              />
              {errors[item.register] && (
                <p className="auth-error-text">
                  {String(errors[item.register]?.message)}
                </p>
              )}
            </div>
          ))}
          <button
            className="bg-black text-white py-3 rounded font-bold hover:bg-gray-800 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
