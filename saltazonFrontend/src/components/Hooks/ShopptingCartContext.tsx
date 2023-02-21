import { createContext, useContext, ReactNode } from 'react';
import { CartItem } from './store';
import { useLocalStorage } from './useLocalStorage';

interface ICartContext {
  addToCart: (id: number) => void,
  removeFromCart: (id: number) => void,
  getQuantity: (id: number) => number,
  cartQuantity: number,
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ICartContext)
export const useShoppingCart = () =>  useContext(ShoppingCartContext)

interface CartProviderProps {
  children: ReactNode
}

export const ShoppingCartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (id: number) => {
    setCartItems(items => {
      if (items.find(item => item.id === id) === undefined) {
        return [...items, { id, quantity: 1 }];
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

  const getQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity || 0;

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        getQuantity,
        cartQuantity,
        cartItems
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}