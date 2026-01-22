import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(30, { message: "Password is to long" })
  .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
  .regex(/[0-9]/, { message: "Password must include a number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must include a special character",
  })
  .refine((v) => !/\s/.test(v), {
    message: "Password must not contain spaces",
  });
const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Write at list 3 symbol" }),
    email: z
      .email({ message: "Write your mail correctly" })
      .trim()
      .toLowerCase()
      .max(100, { message: "Email is to long" }),
    password: passwordSchema,
    confirmPassword: z.string().min(8, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

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
  type InputData = {
    id: number;
    type: string;
    placeholder: string;
    register: "password" | "name" | "email" | "confirmPassword";
    error?: { message: string };
  }[];
  const inputData: InputData = [
    {
      id: 1,
      type: "text",
      placeholder: "Enter your name",
      register: "name",
    },
    {
      id: 2,
      type: "email",
      placeholder: "Enter your email",
      register: "email",
    },
    {
      id: 3,
      type: "password",
      placeholder: "Enter your password",
      register: "password",
    },
    {
      id: 4,
      type: "password",
      placeholder: "Confirm your password",
      register: "confirmPassword",
    },
  ];
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
            {/* საფე */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
