import React from 'react';
import { Link } from 'react-router-dom';

function CartItem({ product, removeFromCart }: any) {
  return (
    <article className='grid grid-cols-5 py-4 border-b'>
      <Link to={`/productList/${product.id}`}>
        <img src={product.imageUrl} alt={'picture of product'} className='h-48 mx-auto' />
      </Link>
      <section className='px-5 col-span-3'>
        <Link to={`/productList/${product.id}`}>
          <h2 className='mb-3'>
            {product.title}
          </h2>
        </Link>
        <p className='text-xs text-green-700'>
          In Stock
        </p>
        <input type="checkbox" className='text-sm' />
        <label className='text-sm pl-2'>This is a gift</label>

        <div className='flex my-2'>
          <form action="" className='text-sm text-center border rounded-lg w-24 p-1 bg-gray-100'>
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

          {/* <h3>Amount {product.amount}</h3> */}
          <button onClick={() => removeFromCart(product.id)} className='px-3 text-sm text-indigo-500 hover:underline' >Remove from Cart</button>
        </div>


      </section>
      <section className='text-right'>
        <h3 className='text-md font-bold'>${product.price}</h3>

      </section>
    </article>
  );
}

export default CartItem;
