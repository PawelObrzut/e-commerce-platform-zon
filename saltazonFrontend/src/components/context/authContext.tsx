import React, { createContext, useState, ReactNode } from "react";
import { AuthContextInterface, UserInterface } from '../../types';

const AuthContext = createContext({} as AuthContextInterface);

interface AuthProviderInterface {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;