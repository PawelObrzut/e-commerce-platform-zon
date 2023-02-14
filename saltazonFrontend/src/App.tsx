import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import LogInSignUp from './components/LogInSignUp/LogInSignUp';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path='/login' element={
          <LogInSignUp />
        }
        ></Route>
        <Route path='/' element={

            <ProductList />

        }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
