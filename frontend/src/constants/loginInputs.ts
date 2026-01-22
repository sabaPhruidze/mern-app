type InputData = {
    id:number,
    type:string,
    placeholder:string,
    name:'email'|'password';
}[]
export const loginInputs:InputData = [
    {
    id: 1,
    type: "email",
    placeholder: "Enter your email",
    name: "email",
  },
  {
    id: 2,
    type: "password",
    placeholder: "Enter your password",
    name: "password",
  },
]