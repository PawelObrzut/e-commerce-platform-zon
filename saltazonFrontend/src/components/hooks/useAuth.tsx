import React, { useContext } from 'react';
import AuthContext from '../context/authContext';

const useAuth: any = () => {
  return useContext(AuthContext);
}

export default useAuth;
