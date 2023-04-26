import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { baseURL } from '../utils/api';
import Spinner from '../Spinner/spinner';

interface SignUpFormInterface {
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
  storeName?: string,
}

function NewUserForm() {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), undefined]).required(),
    role: yup.string().required(),
    storeName: yup.string()
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SignUpFormInterface>({
    resolver: yupResolver(schema)
  });

  const submitSignUp = async ({ email, password, role, storeName }: SignUpFormInterface) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role,
          storeName: storeName
        })
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false)
        // console.log(data);
      } else {
        setLoading(false);
        throw new Error('Sign up failed');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    reset();
  }

  if (loading) {
    return (
      <div className='mt-32'>
        <Spinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(submitSignUp)} >
      <h3 className="text-lg pb-2">Create account</h3>
      <div className="relative z-0 w-full mb-4 group text-left">
        <input
          {...register("email")}
          type="email"
          className={` block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer`}
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        {errors.email && <span className="text-xs text-red-500">Provide correct email format!</span>}
      </div>

      <div className="relative z-0 w-full mb-4 group text-left">
        <input
          {...register("password")}
          type="password"
          className={`block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer`}
          placeholder=" "
        />

        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        {errors.password && <span className="text-xs text-red-500">Password is too short!</span>}
      </div>

      <div className="relative z-0 w-full mb-4 group text-left">
        <input
          {...register("confirmPassword")}
          type="password"
          className={`block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer`}
          placeholder=" "
        />

        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
        {errors.confirmPassword && <span className="text-xs text-red-500">Confirm password does not match!</span>}
      </div>

      <div className="relative z-0 w-full mb-4 group text-left">
        <select 
          placeholder={"user"} 
          {...register("role")}
          className="text-gray-500 w-full h-8 focus:outline-yellow-500"
          >
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
        </select>
      </div>

      <div className="relative z-0 w-full mb-4 group text-left">
        <input
          {...register("storeName")}
          type="text"
          className={` block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer`}
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Store Name - for Admin only</label>
      </div>

      <input
        type="submit"
        value="Sign Up"
        className="cursor-pointer text-white text-right border border-black bg-orange-300 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5"
      />

    </form>
  );
}

export default NewUserForm;
