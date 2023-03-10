import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { decodeJwt } from '../utils/decodeJWT';

interface CartItem {
  id: number,
  imageUrl: string,
  title: string,
  price: string,
  stock: number,
  quantity: number
}

interface CartContextInterface {
  addToCart: (id: number, imageUrl: string, title: string, price: string, stock: number) => void
  removeFromCart: (id: number) => void
  cartItems: CartItem[]
  itemQuantity: (id: number) => number
  cartQuantity: number,
  cartValue: number
}

export const CartContext = createContext({} as CartContextInterface);

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  let id: string;
  if (document.cookie) {
    id = decodeJwt(document.cookie).id;
  }
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(id, []);

  const addToCart = (id: number, imageUrl: string, title: string, price: string, stock: number) => {
    setCartItems(items => {
      if (items.find(item => item.id === id) === undefined) {
        return [...items, { id, imageUrl, title, price, stock, quantity: 1 }];
      }
      return items.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(items => {
      if (items.find(item => item.id === id)?.quantity === 1) {
        return items.filter(item => item.id !== id);
      }
      return items.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const itemQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity || 0;

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const cartValue = cartItems.reduce((total, item) => total + item.quantity * +item.price.slice(1), 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        itemQuantity,
        cartItems,
        cartQuantity,
        cartValue
      }}
    >
      {children}
    </CartContext.Provider>
  );
};