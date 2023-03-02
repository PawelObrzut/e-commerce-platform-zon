import React, {
  createContext, useContext, ReactNode, useState,
} from 'react';
import { decodeJwt } from '../utils/decodeJWT';

interface UserInterface {
  email: string,
  role: string,
  storeId?: number
}

interface UserContextInterface {
  user: UserInterface
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>,
  logIn: (email: string, password: string) => void
  signUp: (email: string, password: string, role: string) => void
}

const UserContext = createContext({} as UserContextInterface);
export const useUser = () => useContext(UserContext);

interface UserProviderInterface {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderInterface) => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  const logIn = (email: string, password: string) => {
    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    }).then(() => {
      decodeJwt(document.cookie);
      window.location.href = '/productList';
    });
  };

  const signUp = (email: string, password:string, role:string) => {
      fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            role,
            storeId: null
        })
      }).then((response) => {
        return response.json()
      }).then(data => console.log(data));
  }

  return (
    <UserContext.Provider
      value= {{
        user,
        setUser,
        logIn,
        signUp
      }}
    >
      { children }
    </UserContext.Provider>
  );
};
