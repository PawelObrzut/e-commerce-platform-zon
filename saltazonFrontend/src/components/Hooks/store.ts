import { create } from 'zustand';

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
  token: string,
  expiresIn: number,
  authenticated: boolean,
  userEmail: string,
  products: ProductInterface[],
  fetchProducts: () => Promise<void>,
  logIn: (email: string, password: string) => Promise<void>,
  signUp: (email: string, password: string, role: string) => Promise<void>,
  updateToken: (token: string, expiresIn: number) => void,
}

const useStore = create<Store>(set => ({
  token: '',
  expiresIn: 0,
  authenticated: false,
  userEmail: '',
  updateToken: (token, expiresIn) => set(state => ({ ...state, token, expiresIn })),

  products: [] as ProductInterface[],
  fetchProducts: async () => {
    try {
      const response = await fetch('http://localhost:8080/product', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA2LCJlbWFpbCI6ImJhYnlKQHdha2FuZGEuY29tIiwicm9sZSI6ImFkbWluIiwic3RvcmVJZCI6bnVsbCwiaWF0IjoxNjc2NDcyMjkzfQ.2-7xRp5aZgnScCxvdXZ5DPPprKGjWAJ_ipHPRYq5TI8'
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
      console.log(credentials);
      set(state => ({ 
        ...state, 
        authenticated: true,
        token: credentials.refreshToken,
        expiresIn: credentials.expiresIn,
        userEmail: credentials.email
      }));

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
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
}))

export default useStore;
