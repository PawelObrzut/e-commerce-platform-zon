import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../types";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { baseURL } from "../utils/api";

function ProfileBar() {
  const navigate = useNavigate();
  const { user, setUser, refreshClass } = useAuth();
  const refresh = useRefreshToken();

  const forceRefresh = () => {
    refresh();
    navigate(-1);
  }

  const handleLogOut = async () => {
    setUser({} as UserInterface);
    try {
      const response = await axios.delete(`${baseURL}/user/logout`, { withCredentials: true });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex justify-end px-10 border-b bg-gray-800 text-gray-50 text-sm'>
        { user.emailAddress && <h1>Logged in as {user.emailAddress}</h1> }
        <button onClick={forceRefresh} className={refreshClass? 'px-10 refreshToken--active' : 'px-10'}>Refresh Token</button>
        <p className='px-10'>Role: {user.role}</p>
        <button onClick={handleLogOut} className='px-10'>Logout</button>
      </div>
    </>
  );
}

export default ProfileBar;
