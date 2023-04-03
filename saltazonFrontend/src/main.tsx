import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './components/context/cartContext';
import { ProductProvider } from './components/context/productsContext';
import { AuthProvider } from './components/context/authContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
);
