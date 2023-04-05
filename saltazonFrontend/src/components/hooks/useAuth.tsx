import React, { useContext } from 'react';
import AuthContext from '../context/authContext';
import { AuthContextInterface } from '../context/authContext'

const useAuth = (): AuthContextInterface => {
  return useContext(AuthContext);
}

export default useAuth;
