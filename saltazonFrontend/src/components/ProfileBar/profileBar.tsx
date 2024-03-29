import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserInterface } from "../../types";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { baseURL } from "../utils/api";

function ProfileBar() {
  const navigate = useNavigate();
  const { user, setUser, refreshClass, setRefreshClass } = useAuth();
  const refresh = useRefreshToken();

  const forceRefresh = async () => {
    await refresh();
    // navigate(-1);
  }

  const handleLogOut = async () => {
    setUser({} as UserInterface);
    try {
      await axios.delete(`${baseURL}/user/logout`, { withCredentials: true });
      setRefreshClass(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex justify-around px-10 border-b bg-gray-800 text-gray-50 text-sm'>
        { user.role === 'admin' && <Link to='./adminPage'><button>Manage your store</button></Link>}
        { user.emailAddress && <h1>Logged in as {user.emailAddress}</h1> }
        <button onClick={forceRefresh} className={refreshClass? 'px-10 refreshToken--active' : 'px-10'}>Refresh Token</button>
        <p className='px-10'>Role: {user.role}</p>
        <button onClick={handleLogOut} className='px-10'>Logout</button>
      </div>
    </>
  );
}

export default ProfileBar;
