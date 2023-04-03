import React, { useContext } from 'react';
import CartContext from '../context/cartContext';

const useCart: any = () => {
  return useContext(CartContext);
}

export default useCart;
