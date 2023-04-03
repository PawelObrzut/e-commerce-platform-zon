import React from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function ProfileBar() {
  const { user } = useAuth();
  const refresh = useRefreshToken()

  const forceRefresh = () => {
    console.log(user)
    refresh()
  }

  return (
    <>
      <div className='flex justify-end px-10 border-b bg-gray-800 text-gray-50 text-sm'>
        { user.emailAddress && <h1>Logged in as {user.emailAddress}</h1> }
        <button onClick={forceRefresh} className='px-10'>Refresh Token</button>
        <p>Role: {user.role}</p>
      </div>
    </>
  );
}

export default ProfileBar;
