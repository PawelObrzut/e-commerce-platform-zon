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

export interface CartItem {
  id: number,
  quantity: number
}

type Store = {
  products: ProductInterface[],
  previousPage: number | undefined,
  currentPage: number | undefined,
  nextPage: number | undefined,
  numberOfProducts: number | undefined,
  limit: number | undefined,
  fetchProducts: (page: string) => Promise<void>,
  logIn: (email: string, password: string) => Promise<void>,
  signUp: (email: string, password: string, role: string) => Promise<void>,
  updateToken: (token: string, expiresIn: number) => void,
  handlePreviousPage: () => void,
  handleNextPage: () => void,
  product: ProductInterface,
  setProduct: (id: number) => void,
}

const useStore = create<Store>(set => ({
  products: [] as ProductInterface[],
  previousPage: undefined,
  currentPage: undefined,
  nextPage: undefined,
  numberOfProducts: undefined,
  limit: undefined,
  fetchProducts: async (page) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:8080/product?page=${page}&limit=12`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const products = await response.json();
      set(state => ({
        ...state,
        products: products.responseData,
        previousPage: products.previous,
        nextPage: products.next,
        numberOfProducts: products.count,
        limit: products.limit,
        currentPage: products.page
      }))
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

  handlePreviousPage: () => {
    const prev = useStore.getState().previousPage;
    if (prev) {
      useStore.getState().fetchProducts(prev.toString());
    }
  },
  handleNextPage: () => {
    const next = useStore.getState().nextPage;
    if (next) {
      useStore.getState().fetchProducts(next.toString());
    }
  },

  product: {} as ProductInterface,
  setProduct: (id) => {
    const product = useStore.getState().products.find(product => product.id === id);
    if (product) {
      set(state => ({
        ...state,
        product
      }));
    }
  },

}))

export default useStore;
