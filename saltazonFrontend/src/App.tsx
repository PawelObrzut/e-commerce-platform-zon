import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import LogInSignUp from './components/LogInSignUp/LogInSignUp';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import PrivateRoutes from './components/utils/PrivateRoutes';
import ProductPage from './components/ProductPage/ProductPage';
import StorePage from './components/StorePage/StorePage';

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route 
          path='/login' 
          element={<LogInSignUp />}
        ></Route>

        <Route element={<PrivateRoutes />} >
          <Route element={<ProductList />} path='/'></Route>
          <Route path="/:id" element={<ProductPage />} />
        </Route>

        <Route element={<PrivateRoutes />} >
          <Route 
            path='/cart' 
            element={<Cart />}
          ></Route>
        </Route>

        <Route element={<PrivateRoutes />} >
          <Route 
            path='/store' 
            element={<StorePage />}
          ></Route>
        </Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
