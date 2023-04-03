import React, {
  createContext, useContext, ReactNode, useState, useEffect,
} from 'react';
import { ProductInterface } from '../../types';
import useFetch from '../hooks/useFetch';
import { baseURL } from '../utils/api'

interface ProductListInterface {
  count?: number,
  limit?: number,
  next?: number,
  page?: number,
  responseData: ProductInterface[],
}

interface ProductContextInterface {
  categories: string[],
  products: ProductInterface[],
  isLoading: boolean,
  error: string | null,
  next: number,
  page: number,
  count: number,
  limit: number,
  setUrl: React.Dispatch<React.SetStateAction<string>>
}

const ProductsContext = createContext({} as ProductContextInterface);

interface ProductProviderInterface {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderInterface) => {
  const [url, setUrl] = useState(`${baseURL}/product?page=1&limit=12`)

  const categories: string[] = [
    'Baby', 'Movies', 'Sports', 'Beauty', 'Books', 'Clothing', 'Industrial', 'Grocery', 'Outdoors', 'Computers',
    'Kids', 'Automotive', 'Jewelry', 'Shoes', 'Health', 'Toys', 'Music', 'Tools', 'Home', 'Electronics', 'Garden', 'Games'
  ]

  const { data, isLoading, error } = useFetch<ProductListInterface>(url);

  return (
    <ProductsContext.Provider
      value= {{
        categories,
        products: data?.responseData,
        isLoading,
        error,
        next: data?.next,
        page: data?.page,
        count: data?.count,
        limit: data?.limit,
        setUrl,
      }}
    >
      { children }
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
