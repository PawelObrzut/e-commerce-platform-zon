import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import Spinner from '../Spinner/spinner';
import { baseURL } from '../utils/api';
import { ProductInterface } from '../../types';

interface StoreInterface {
  uniqueStoreId: number,
  storeName: string,
  products: ProductInterface[]
}

const AdminPage = () => {
  const { user } = useAuth();

  const url = `${baseURL}/store/${user.storeId}`;
  const { data, isLoading, error } = useFetch<StoreInterface>(url);

  if (isLoading) {
    return (
      <main className='flex items-center justify-center h-[70vh]'>
        <Spinner />
      </main>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className='min-h-screen p-5'>
      <section className='p-5 mb-2 bg-slate-50'>
        <h2 className='text-2xl'>Store Panel</h2>
        <hr />
        <p>StoreId: {data.uniqueStoreId}</p>
        <p>StoreName: {data.storeName}</p>
      </section>
  
      <section className='p-5 mb-2 bg-slate-50'>
        <h3>Add New Item Form</h3>
      </section>
  
      <section className='p-5 mb-2 bg-slate-50'>
        <h3 className='border-b'>Your inventory:</h3>
        {
          data.products.map((product: ProductInterface) => (
            <article key={product.id}>
              {product.title}

            </article>
          ))
        }
      </section>
    </main>
  );
  
}

export default AdminPage;
