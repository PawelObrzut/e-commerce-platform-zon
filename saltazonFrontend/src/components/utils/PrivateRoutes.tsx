import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
    const token = Cookies.get('accessToken');

    return(
        token ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;
