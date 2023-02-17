import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface ProductInterface {
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  storeId: number,
  price: string,
  quantity: number,
  category: string
}

type Store = {
  products: ProductInterface[],
  fetchProducts: () => Promise<void>,
  logIn: (email: string, password: string) => Promise<void>,
  signUp: (email: string, password: string, role: string) => Promise<void>,
  updateToken: (token: string, expiresIn: number) => void,
}

const useStore = create<Store>(set => ({
  products: [] as ProductInterface[],
  fetchProducts: async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('http://localhost:8080/product', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const products = await response.json();
      set(state => ({ ...state, products: products }))
    } catch (error) {
      console.error(error)
    }
  },
  logIn: async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      });
      const credentials = await response.json();
      const expires = new Date();
      expires.setTime(expires.getTime() + credentials.expiresIn * 60 * 60 * 1000);
      Cookies.set('token', credentials.refreshToken, { expires });
      Cookies.set('email', email, { expires });
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  },
  signUp: async (email, password, role) => {
    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            role,
            storeId: null
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  },
  updateToken: (token, expiresIn) => set(state => ({ ...state, token, expiresIn })),
}))

export default useStore;
