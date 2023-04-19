import React, { createContext, ReactNode, RefObject, useRef, useState } from "react";

export interface SearchContextInterface {
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>
  inputValue: RefObject<HTMLInputElement>
}

const SearchContext = createContext({} as SearchContextInterface);

interface SearchProviderInterface {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderInterface) => {
  const [ category, setCategory] = useState('');
  const inputValue: RefObject<HTMLInputElement> = useRef(null);

  return (
    <SearchContext.Provider
      value={{
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
