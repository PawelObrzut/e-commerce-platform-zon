import React, { useState } from 'react';
import { ProductInterface } from '../../types';
import useFetch from '../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import Product from '../Products/Product';
import { baseURL } from '../utils/api';

const sorted = false;

function compareProductCategory(a: any, b: any) {
  if (a.category < b.category) {
    return -1;
  }
  if (a.category > b.category) {
    return 1;
  }
  return 0;
}

function sortByCategory(products: any) {
  console.log(products);
  return products.sort(compareProductCategory);
}

function sortSomething(category: any) {
  console.log(`sorting things would be cool${category}`);
}

interface ProductListInterface {
  count?: number,
  limit?: number,
  next?: number,
  page?: number,
  responseData: ProductInterface[],
}

const ProductListPage = () => {
  const [url, setUrl] = useState(`${baseURL}/product?page=1&limit=12`);

  const { data, isLoading, error } = useFetch<ProductListInterface>(url);

  const count = data?.count;
  const limit = data?.limit;
  const next = data?.next;
  const page = data?.page;


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let sortedProducts;
  if (sorted) {
    sortedProducts = sortByCategory(data?.responseData);
  } else {
    sortedProducts = data?.responseData;
  }

  return (
    <>
      {/* <CategorySorter categories={['First Category', 'Second Category']} sorterFunction={sortSomething} /> */}
      <main className='flex justify-between py-5 bg-gray-50'>
        <aside className='w-1/5 h-96 ml-2 border border-gray-200'>
          
        </aside>
        <section className='w-4/5 grid grid-cols-4 gap-1 px-5'>
        {
          sortedProducts?.map((product: ProductInterface) => (
            <Product key={product.id} {...product} />))
        }
          <Pagination setUrl={setUrl} count={count} limit={limit} next={next} page={page} />
        </section>
      </main>
    </>);
}

export default ProductListPage;
