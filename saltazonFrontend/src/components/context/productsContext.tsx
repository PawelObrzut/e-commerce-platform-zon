import React, {
  createContext, ReactNode, useState,
} from 'react';
import { baseURL } from '../utils/api'

interface ProductContextInterface {
  categories: string[],

}

const ProductsContext = createContext({} as ProductContextInterface);

interface ProductProviderInterface {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderInterface) => {
  const categories: string[] = [
    'Baby', 'Movies', 'Sports', 'Beauty', 'Books', 'Clothing', 'Industrial', 'Grocery', 'Outdoors', 'Computers',
    'Kids', 'Automotive', 'Jewelry', 'Shoes', 'Health', 'Toys', 'Music', 'Tools', 'Home', 'Electronics', 'Garden', 'Games'
  ]

  return (
    <ProductsContext.Provider
      value= {{
        categories,
      }}
    >
      { children }
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
