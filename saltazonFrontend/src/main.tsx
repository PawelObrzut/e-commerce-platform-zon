import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './components/context/cartContext';
import { ProductProvider } from './components/context/productContext';
import { UserProvider } from './components/context/userContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductProvider>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </ProductProvider>
  </React.StrictMode>,
);
