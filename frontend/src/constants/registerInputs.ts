type InputData = {
    id: number;
    type: string;
    placeholder: string;
    register: "password" | "name" | "email" | "confirmPassword";
    error?: { message: string };
  }[];
  export const inputData: InputData = [
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