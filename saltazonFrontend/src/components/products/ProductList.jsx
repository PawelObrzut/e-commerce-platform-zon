import Product from './Product.jsx';
import "../../App.css"
import CategorySorter from "./CategorySorter.jsx";
import { useEffect, useState } from 'react';

const sorted = false;

function sortByCategory(products) {
  console.log(products)
  return products.sort(compareProductCategory);
}

function compareProductCategory(a, b) {
  if (a.category < b.category) {
    return -1;
  }
  if (a.category > b.category) {
    return 1;
  }
  return 0;
}

function sortSomething(category) {
  console.log('sorting things would be cool' + category);
}

function ProductList({ products, addToCart }) {
  let sortedProducts;
  if (sorted) {
    sortedProducts = sortByCategory(products);
  } else {
    sortedProducts = products;
  }

  const [fetchProducts, setFetchProducts] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/product', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('satazonAuth')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setFetchProducts(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <CategorySorter categories={['First Category', 'Second Category']} sorterFunction={sortSomething}/>
      <section className={"product_list"}>
        {
          fetchProducts?.map(product => (
            <Product key={product.id} product={product} addtoCart={addToCart}/>
          ))
        // sortedProducts
        //   .map((p) => {
        //     return (
        //       <Product 
        //         key={p.id}
        //         product={p}
        //         addToCart={addToCart}
        //       />
        //     )
        //   })
        }
      </section>
    </>
  )
}

export default ProductList;