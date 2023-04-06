import React, { createContext, useState, ReactNode } from "react";
import { UserInterface } from '../../types';

export interface AuthContextInterface {
  user: UserInterface
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>
  refreshClass: boolean,
  setRefreshClass: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext({} as AuthContextInterface);

interface AuthProviderInterface {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const [refreshClass, setRefreshClass] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        refreshClass,
        setRefreshClass,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;