import React, { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.email
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;


// import React, { useEffect, useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom'
// import Cookies from 'js-cookie';
// import { decodeJwt } from '../utils/decodeJWT';

// const PrivateRoutes = () => {
//   const accessToken = Cookies.get('accessToken');
//   const { exp: tokenExpiresAt } = decodeJwt(accessToken);
//   // exp: 1680261436

//   const isTokenExpired = () => {
//     return tokenExpiresAt < Date.now() / 1000;
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (isTokenExpired()) {
//         clearInterval(interval);
//         Cookies.remove('accessToken');
//       }
//     }, 1000)
//     return () => clearInterval(interval);
//   }, [tokenExpiresAt]);

//   return (
//     accessToken ? <Outlet/> : <Navigate to="/login" />
//   )
// }

// export default PrivateRoutes;



// const PrivateRoutes = () => {
//     const [timeLeft, setTimeLeft] = useState(null);
//     const accessToken = Cookies.get('accessToken');
//     const tokenExpiresAt = Cookies.get('tokenExpiresAt');
  
//     // Check if token is expired
//     const isTokenExpired = () => {
//       return new Date(tokenExpiresAt) < new Date();
//     };
  
//     // Delete token and token expiration cookie
//     const deleteTokenCookies = () => {
//       Cookies.remove('accessToken');
//       Cookies.remove('tokenExpiresAt');
//     };
  
//     // Start monitoring token expiration time
//     useEffect(() => {
//       const interval = setInterval(() => {
//         const timeLeft = Math.round((new Date(tokenExpiresAt) - new Date()) / 1000);
//         setTimeLeft(timeLeft);
  
//         if (isTokenExpired()) {
//           clearInterval(interval);
//           deleteTokenCookies();
//         }
//       }, 1000);
  
//       return () => clearInterval(interval);
//     }, [tokenExpiresAt]);
  
//     // Redirect to login if token is not present or expired
//     if (!accessToken || isTokenExpired()) {
//       return <Navigate to="/login" />;
//     }
  
//     return <Outlet />;
//   };