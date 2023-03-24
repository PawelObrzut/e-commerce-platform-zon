import React, {
  createContext, useContext, ReactNode, useState,
} from 'react';
import { ProductInterface } from '../../types';
import { PaginateDetailsInterface } from '../../types';
import useFetch from '../hooks/useFetch';

interface ProductContextInterface {
  categories: string[],
  products: ProductInterface[],
  isLoading: boolean,
  error: string | null,
  details: PaginateDetailsInterface,
  setUrlPage: React.Dispatch<React.SetStateAction<number>>
}

const ProductContext = createContext({} as ProductContextInterface);
export const useProduct = () => useContext(ProductContext);

interface ProductProviderInterface {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderInterface) => {
  const [urlPage, setUrlPage] = useState(1);

  const categories: string[] = [
    'Baby', 'Movies', 'Sports', 'Beauty', 'Books', 'Clothing', 'Industrial', 'Grocery', 'Outdoors', 'Computers',
    'Kids', 'Automotive', 'Jewelry', 'Shoes', 'Health', 'Toys', 'Music', 'Tools', 'Home', 'Electronics', 'Garden', 'Games'
  ]

  const { data: products, isLoading, error, details } = useFetch<ProductInterface[]>(`http://localhost:8080/product?page=${urlPage}&limit=12`);

  return (
    <ProductContext.Provider
      value= {{
        categories,
        products,
        isLoading,
        error,
        details,
        setUrlPage,
      }}
    >
      { children }
    </ProductContext.Provider>
  );
};
