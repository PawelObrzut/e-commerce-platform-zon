import React, { useContext } from 'react';
import ProductsContext from '../context/productsContext';

const useProducts: any = () => {
  return useContext(ProductsContext);
}

export default useProducts;
