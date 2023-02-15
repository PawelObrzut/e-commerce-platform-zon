import { create } from 'zustand';

interface ProductInterface {
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
  email: string,
  password: string,
  role: string,
  setEmail: (email: string) => void,
  setPassword: (password: string) => void,
  setRole: (role: string) => void,
  handleLogIn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleSignUp: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
  products: ProductInterface[],
  fetchProducts: () => Promise<void>,
}

const useStore = create<Store>(set => ({
  email: '',
  password: '',
  role: 'user',
  setEmail: (email) => set(state => ({ ...state, email })),
  setPassword: (password) => set(state => ({ ...state, password})),
  setRole: (role) => set(state => ({ ...state, role})),
  handleLogIn: async (event) => {
    event.preventDefault();

    const { email, password } = useStore.getState();
    const form = event.currentTarget;

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
      form.reset();
    } catch (error) {
      console.error(error);
    }
  },
  handleSignUp: async (event) => {
    event.preventDefault();
    const { email, password, role } = useStore.getState();
    const form = event.currentTarget;

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
      form.reset();
    } catch (error) {
      console.error(error)
    }
  },
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
      console.log(products)
    } catch (error) {
      console.error(error)
    }
  }
}))

export default useStore;
