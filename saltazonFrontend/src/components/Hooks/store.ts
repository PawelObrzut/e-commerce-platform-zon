import { create } from 'zustand';

type Store = {
  email: string,
  password: string,
  role: string,
  setEmail: (email: string) => void,
  setPassword: (password: string) => void,
  setRole: (role: string) => void,
  handleLogIn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleSignUp: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
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
  }
}))

export default useStore;
