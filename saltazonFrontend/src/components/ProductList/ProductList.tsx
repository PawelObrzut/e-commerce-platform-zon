import './ProductList.css'
import Product from './subComponents/Product/Product'
import useStore from '../Hooks/store';
import { useEffect, useMemo } from 'react';

const ProductList = () => {
  const store = useStore();

  const memoizedStore = useMemo(() => store, [store]);

  useEffect(() => {
    memoizedStore.fetchProducts();
  }, [memoizedStore]);

  return (
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
  )
}

export default ProductList