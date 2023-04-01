import React, { createContext, useState, ReactNode } from "react";

interface AuthContextInterface {
  auth: any
  setAuth: any
}

const AuthContext = createContext({} as AuthContextInterface);

interface AuthProviderInterface {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;