import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductInterface } from '../../types';
import useFetch from '../hooks/useFetch';
import Product from '../Products/product';
import { baseURL } from '../utils/api';

interface Store {
  store: string,
  products: ProductInterface[]
}

const StorePage = () => {
  const { id: storeId } = useParams();

  const { data, isLoading, error } = useFetch<Store>(`${baseURL}/store/${storeId}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className='bg-gray-50 text-center'>
      <header className='bg-gray-100 p-10'>
        <h1 className='text-xl italic'>{data?.store}</h1>
      </header>
      <section className='grid grid-cols-4 gap-1'>
        {
          data?.products.map(product => (
            <Product key={product.id} {...product} />
          ))
        }
      </section>
    </main>
  )
}

export default StorePage;
