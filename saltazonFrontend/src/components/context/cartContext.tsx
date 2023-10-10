import React, { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartItem } from '../../types';
import useAuth from '../hooks/useAuth';

export interface CartContextInterface {
  addToCart: ({ id, imageUrl, title, price, stock, quantity }: CartItem) => void
  updateCartItem: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  cartItems: CartItem[]
  itemQuantity: (id: number) => number
  cartQuantity: number
  cartValue: number
}

const CartContext = createContext({} as CartContextInterface);

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useLocalStorage<Record<string, CartItem[]>>('cartItems', () => {
    const storedCart = localStorage.getItem(`cartItems`);
    const parsedCart = JSON.parse(storedCart);
    return parsedCart || {};
  });

  const userCartItems = cartItems[user.emailAddress] || [];

  const addToCart = ({ id, imageUrl, title, price, stock, quantity }: CartItem) => {
    setCartItems(items => {
      const userCart = items[user.emailAddress] || [];
      if (userCart.find(item => item.id === id) === undefined) {
        return { ...items, [user.emailAddress]: [...userCart, { id, imageUrl, title, price, stock, quantity: quantity }] };
      }
      const updatedCart = userCart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      return { ...items, [user.emailAddress]: updatedCart };
    });
  };

  const updateCartItem = (id: number, quantity: number) => {
    setCartItems(items => {
      const userCart = items[user.emailAddress] || [];
      const updatedCart = userCart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      return { ...items, [user.emailAddress]: updatedCart };
    });
  }

  const removeFromCart = (id: number) => {
    setCartItems(items => {
      const userCart = items[user.emailAddress] || [];
      if (userCart.find(item => item.id === id)?.quantity === 1) {
        const updatedCart = userCart.filter(item => item.id !== id);
        return { ...items, [user.emailAddress]: updatedCart };
      }
      const updatedCart = userCart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return { ...items, [user.emailAddress]: updatedCart };
    });
  };

  const itemQuantity = (id: number) => userCartItems.find(item => item.id === id)?.quantity || 0;

  const cartQuantity = userCartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const cartValue = userCartItems.reduce((total, item) => total + item.quantity * +item.price.slice(1), 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        updateCartItem,
        removeFromCart,
        itemQuantity,
        cartItems: userCartItems,
        cartQuantity,
        cartValue
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
