import React from 'react'
import { useProduct } from '../context/productContext'
import ProductList from '../Products/ProductList'

const ProductListPage = () => {
  const { isLoading, error } = useProduct();

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