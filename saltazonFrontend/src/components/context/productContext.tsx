import React, {
  createContext, useContext, ReactNode, useState,
} from 'react';
import useFetch from '../hooks/useFetch';
import { ProductInterface } from '../../types';

interface ProductContextInterface {
  categories: string[],

}

const ProductContext = createContext({} as ProductContextInterface);
export const useProduct = () => useContext(ProductContext);

interface ProductProviderInterface {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderInterface) => {

  const categories: string[] = [
    'Baby', 'Movies', 'Sports', 'Beauty', 'Books', 'Clothing', 'Industrial', 'Grocery', 'Outdoors', 'Computers',
    'Kids', 'Automotive', 'Jewelry', 'Shoes', 'Health', 'Toys', 'Music', 'Tools', 'Home', 'Electronics', 'Garden', 'Games'
  ]

  return (
    <ProductContext.Provider
      value= {{
        categories
      }}
    >
      { children }
    </ProductContext.Provider>
  );
};
