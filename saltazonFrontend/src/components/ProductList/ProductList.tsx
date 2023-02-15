import './ProductList.css'
import Product from './subComponents/Product/Product'
import useStore from '../Hooks/store';
import { useEffect } from 'react';

const ProductList = () => {
  const store = useStore();

  useEffect(() => {
    store.fetchProducts();
  },[])

  return (
    <main className="products--container">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </main>
  )
}

export default ProductList