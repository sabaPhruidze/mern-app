import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterSchema } from "../schemas/register";
import { registerSchema } from "../schemas/register";
import { inputData } from "../constants/registerInputs";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });
  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
    reset();
  };
  
  const inputclasses =
    "border p-3 rounded-lg w-full outline-none focus:outline-none focus:border-cyan-800 focus:ring-0 transition";
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Registration
        </h1>
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
              {errors[item.register]?.message === undefined ? "" : (
                <p className="text-red-500 text-sm">
                {String(errors[item.register]?.message)}
              </p>
              )}
              
            </div>
          ))}
          <button className="bg-black text-white py-3 rounded font-bold hover:bg-gray-800 mt-2 cursor-pointer">
            Register
          
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
