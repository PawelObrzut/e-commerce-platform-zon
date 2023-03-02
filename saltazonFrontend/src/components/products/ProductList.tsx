import Product, { ProductInterface } from './Product';
import '../../App.css';
import CategorySorter from './CategorySorter';
import React from 'react';

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

function ProductList({ products, addToCart }: any) {
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
        <aside className='w-1/5 h-full'>
          <p className='pt-5 pl-5 pb-3'>Lots of filtering options</p>
          <p className='pl-5 pb-3'>Lots of filtering options</p>
          <p className='pl-5 pb-3'>Lots of filtering options</p>
          <p className='pl-5 pb-3'>Lots of filtering options</p>
          <p className='pl-5 pb-3'>Lots of filtering options</p>
          <p className='pl-5 pb-3'>Lots of filtering options</p>
          <hr />
          <p className='pl-5 pb-3'>more options</p>
          <p className='pl-5 pb-3'>more options</p>
          <p className='pl-5 pb-3'>more options</p>
        </aside>
        <section className='w-4/5 grid grid-cols-4 gap-1 px-5'>{
          sortedProducts.map((product: ProductInterface) => (
            <Product key={product.id} {...product} />))
        }
        </section>
      </main>
    </>);
}

export default ProductList;
