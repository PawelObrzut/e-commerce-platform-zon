import React, { useState } from 'react';
import { ProductInterface, ProductListInterface } from '../../types';
import useFetch from '../hooks/useFetch';
import Pagination from '../Pagination/pagination';
import Product from '../Products/product';
import { baseURL } from '../utils/api';
import Spinner from '../Spinner/spinner';
import useSearch from '../hooks/useSearch';

const SearchResultsPage = () => {
  const { category, inputValue } = useSearch();
  const [url, setUrl] = useState(`${baseURL}/product?page=1&limit=12&category=${category}&searchQuery=${inputValue.current.value}`);

  const { data, isLoading, error } = useFetch<ProductListInterface>(url);

  const count = data?.count;
  const limit = data?.limit;
  const next = data?.next;
  const page = data?.page;

  if (isLoading) {
    return (
      <main className='flex items-center justify-center h-[70vh]'>
        <Spinner />
      </main>
    )
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <main className='flex justify-between py-5 bg-gray-50'>
        <aside className='w-1/5 h-96 ml-2 border border-gray-200'>
          
        </aside>
        <section className='w-4/5 grid grid-cols-4 gap-1 px-5'>
        {
          data?.responseData?.map((product: ProductInterface) => (
            <Product key={product.id} {...product} />))
        }
          <Pagination setUrl={setUrl} count={count} limit={limit} next={next} page={page} />
        </section>
      </main>
    </>);
}

export default SearchResultsPage;
