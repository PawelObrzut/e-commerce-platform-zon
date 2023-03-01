import React, {
  createContext, useContext, ReactNode, useState,
} from 'react';

interface ProductInterface {
  id: number,
  quantity: number,
  title: string,
  description: string,
  imageUrl: string,
  storeId: number
}

interface ProductContextInterface {
  categories: string[],
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>,
}

const ProductContext = createContext({} as ProductContextInterface);
export const useProduct = () => useContext(ProductContext);

interface ProductProviderInterface {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderInterface) => {
  const [products, setProducts] = useState<ProductInterface[]>({} as ProductInterface[]);
  const categories: string[] = [
    'Baby', 'Movies', 'Sports', 'Beauty', 'Books', 'Clothing', 'Industrial', 'Grocery', 'Outdoors', 'Computers',
    'Kids', 'Automotive', 'Jewelry', 'Shoes', 'Health', 'Toys', 'Music', 'Tools', 'Home', 'Electronics', 'Garden', 'Games'
  ]

  return (
    <ProductContext.Provider
      value= {{
        categories,
        setProducts,
      }}
    >
      { children }
    </ProductContext.Provider>
  );
};
