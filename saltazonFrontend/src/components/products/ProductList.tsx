import React from 'react';
import Product from './Product';
import useFetch from '../hooks/useFetch';
import CategorySorter from './CategorySorter';
import { ProductInterface } from '../../types';

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

function ProductList() {
  const { data: products, isLoading, error } = useFetch<ProductInterface[]>('http://localhost:8080/product?page=1&limit=12');
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let sortedProducts;
  if (sorted) {
    sortedProducts = sortByCategory(products);
  } else {
    sortedProducts = products;
  }

  return (
    <>
      {/* <CategorySorter categories={['First Category', 'Second Category']} sorterFunction={sortSomething} /> */}
      <main className='flex justify-between py-5'>
        <aside className='w-1/5 h-96 ml-2 border border-gray-200'>
          
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
