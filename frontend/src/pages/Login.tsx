import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginSchema } from "../schemas/login";
import { loginInputs } from "../constants/loginInputs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, reset } from "../store/slices/authSlice";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isError = useAppSelector((state) => state.auth.isError);
  const isSuccess = useAppSelector((state) => state.auth.isSuccess);
  const message = useAppSelector((state) => state.auth.message);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isError) {
      setError("root", { message });
    }
    if (isSuccess) {
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch, setError]);
  const onSubmit = async (data: LoginSchema) => {
    dispatch(login(data));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <p className="auth-title">Welcome back!</p>
        {errors.root && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {errors.root.message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {loginInputs.map((item) => (
            <div key={`${item.id}-${item.name}`}>
              <input
                type={item.type}
                placeholder={item.placeholder}
                {...register(item.name)}
                className={`auth-input ${errors[item.name] ? "border-red-500" : ""}`}
              />
              {errors[item.name] && (
                <p className="auth-error-text">{errors[item.name]?.message}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white py-3 rounded font-bold hover:bg-gray-800 cursor-pointer disabled:bg-gray-400"
          >
            {isLoading ? "logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
