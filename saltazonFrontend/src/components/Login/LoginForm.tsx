import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUser } from "../context/userContext";

interface LogInFormInterface {
  email: string,
  password: string
}

function LoginForm() {
  const {
    logIn
  } = useUser();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LogInFormInterface>({
    resolver: yupResolver(schema)
  });

  const sumbitLogIn = ({email, password }: LogInFormInterface) => {
    logIn(email, password);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(sumbitLogIn)} >
      <h3 className="text-lg pb-2">Login to saltazon</h3>
      <div className="relative z-0 w-full mb-4 group text-left">
        <input 
          {...register("email")}
          type="email"
          className={` block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer`} 
          placeholder=" "
          />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        { errors.email && <span className="text-xs text-red-500">Provide correct email format!</span>}
      </div>

      <div className="relative z-0 w-full mb-4 group text-left">
        <input 
          {...register("password")}
          type="password"
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer`}
          placeholder=" " 
        />
        
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        { errors.password && <span className="text-xs text-red-500">Password is too short!</span>}
      </div>

      <input 
        type="submit"
        value="Submit"
        className="cursor-pointer text-white text-right bg-orange-300 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5"
        />

    </form>
  );
}

export default LoginForm;

