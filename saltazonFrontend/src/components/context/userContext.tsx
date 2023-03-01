import React, {
  createContext, useContext, ReactNode, useState,
} from 'react';

interface UserInterface {
  email: string,
  role: string,
  storeId?: number
}

interface UserContextInterface {
  user: UserInterface
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>,
}

const UserContext = createContext({} as UserContextInterface);
export const useUser = () => useContext(UserContext);

interface UserProviderInterface {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderInterface) => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  return (
    <UserContext.Provider
      value= {{
        user,
        setUser,
      }}
    >
      { children }
    </UserContext.Provider>
  );
};
