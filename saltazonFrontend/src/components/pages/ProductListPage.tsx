import React from 'react';
import useProducts from '../hooks/useProducts';
import ProductList from '../Products/ProductList';

const ProductListPage = () => {
  const { isLoading, error } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  
  return (
    <main className='bg-gray-50'>
      <ProductList />
    </main>
  )
}

export default ProductListPage