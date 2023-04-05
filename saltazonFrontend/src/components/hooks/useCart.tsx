import React, { useContext } from 'react';
import CartContext from '../context/cartContext';
import { CartContextInterface } from '../context/cartContext'

const useCart = (): CartContextInterface => {
  return useContext(CartContext);
}

export default useCart;
