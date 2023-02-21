import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from './components/Hooks/ShopptingCartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ShoppingCartProvider>
  </React.StrictMode>
);
