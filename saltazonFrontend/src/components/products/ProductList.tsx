import Product from './Product';
import '../../App.css';
import CategorySorter from './CategorySorter';
import React, { useEffect, useState } from 'react';
import { ProductInterface } from '../../types';
import useFetch from '../hooks/useFetch';
import Cookies from 'js-cookie';

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

function ProductList({ addToCart }: any) {
  const { data: products, isLoading, error } = useFetch('http://localhost:8080/product', 1, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get('credentials')
    }
  });

  let sortedProducts;
  if (sorted) {
    sortedProducts = sortByCategory(products);
  } else {
    sortedProducts = products;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* <CategorySorter categories={['First Category', 'Second Category']} sorterFunction={sortSomething} /> */}
      <main className='flex justify-between py-5'>
        <aside className='w-1/5 h-full bg-slate-400'>
          <span>any content</span>
        </aside>
        <section className='w-4/5 grid grid-cols-4 gap-1 px-5'>
        {
          sortedProducts?.map((product: ProductInterface) => (
            <Product key={product.id} {...product} />))
        }
        </section>
      </main>
    </>);
}

export default ProductList;
