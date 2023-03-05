import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GrPrevious } from 'react-icons/gr';
import { ProductInterface } from '../../types';
import useFetch from '../hooks/useFetch';
import PriceTag from '../products/PriceTag';
import { useCart } from '../context/cartContext';

const ProductPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useFetch<ProductInterface>(`http://localhost:8080/product/${productId}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className='w-full pb-10 bg-white'>
      <p className='inline-flex text-xs p-3'>
        <GrPrevious size={7} className='relative top-1 mr-2' />
        <button onClick={() => navigate(-1)}>Back to results</button>
      </p>
      <section className='w-full pl-28 grid grid-cols-4 gap-2'>
        <img src={product.imageUrl} alt={product.title} className='w-full' />
        <article className='col-span-2 pl-2'>
          <h2 className='text-xl font-semibold'>{product.title}</h2>
          <p className='py-5'>{product.description}</p>
          <a href="#" className='text-sm text-blue-500 hover:text-red-500 hover:underline'>Visit the Store</a>
          <hr className='w-11/12 py-1' />
          <PriceTag product={product} />
          <ul className='list-disc pl-4'>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores deserunt inventore vero culpa adipisci minus nostrum nisi, saepe eos. Ad dolores nobis, harum at libero quaerat saepe exercitationem eaque explicabo.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta vero magnam voluptatibus ullam quo, delectus ipsam accusantium neque magni, expedita dolore quibusdam, inventore excepturi distinctio cupiditate amet odit. Cumque, atque?</li>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, maiores? Ipsam officiis tempora minima cumque sit rerum ipsa nesciunt, ipsum doloremque, accusamus id delectus enim libero quae magni earum harum!</li>
          </ul>
        </article>
        <aside className='border rounded border-gray-300 p-5 h-3/4'>
          <PriceTag product={product} />
          <p className='text-xs text-gray-500'>No Import Fees Deposit & $15.00 Shipping to Sweden</p>
          {product.quantity > 0 && <p className='text-md text-green-600 py-3'>In Stock</p>}
          <form action="" className='text-xs text-center border rounded-l-full rounded-r-full w-2/5 bg-gray-100'>
            <label htmlFor="Qty">Qty:</label>
            <select name="quantity" id="Qty" className='bg-gray-100 pl-2'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </form>
          <button 
            className='my-5 text-sm text-center bg-yellow-300 rounded-l-full rounded-r-full w-full p-1 hover:bg-yellow-400'
            onClick={() => addToCart(product.id, product.imageUrl, product.title, product.price, product.quantity)}
          >
            Add to Cart
          </button>
        </aside>
      </section>
    </main>
  )
}

export default ProductPage