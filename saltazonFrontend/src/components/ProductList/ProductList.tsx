import './ProductList.css'
import Product from './subComponents/Product/Product'
import useStore from '../Hooks/store';
import { useEffect } from 'react';
import Pagination from './subComponents/Pagination/Pagination';

const ProductList = () => {
  const store = useStore();

  useEffect(() => {
    store.fetchProducts('1');
    console.log('once')
  }, []);

  return (
    <>
      <main className="products--container">
        {
          store.products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              storeId={product.storeId}
              price={product.price}
              quantity={product.quantity}
              category={product.category}
            />
          ))
        }
      </main>
      <Pagination />
    </>
  )
}

export default ProductList