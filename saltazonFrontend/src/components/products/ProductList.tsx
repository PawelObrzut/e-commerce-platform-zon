import Product from './Product';
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
            <CategorySorter categories={['First Category', 'Second Category']} sorterFunction={sortSomething}/>
            <section className={'product_list'}>{
                sortedProducts
                  ?.map((p: any) => (
                            <Product key={p.id}
                                     product={p}
                                     addToCart={addToCart}/>))
            }
            </section>
        </>);
}

export default ProductList;
