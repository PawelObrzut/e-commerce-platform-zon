import React, { createContext, ReactNode, RefObject, useRef, useState } from "react";

export interface SearchContextInterface {
  url: string,
  setUrl: React.Dispatch<React.SetStateAction<string>>,
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>,
  inputValue: RefObject<HTMLInputElement>,
}

const SearchContext = createContext({} as SearchContextInterface);

interface SearchProviderInterface {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderInterface) => {
  const [category, setCategory] = useState('');
  const inputValue: RefObject<HTMLInputElement> = useRef(null);

  const [url, setUrl] = useState('');

  return (
    <SearchContext.Provider
      value={{
        url,
        setUrl,
        category,
        setCategory,
        inputValue
      }}
    >
      { children }
    </SearchContext.Provider>
  )
}

export default SearchContext;
