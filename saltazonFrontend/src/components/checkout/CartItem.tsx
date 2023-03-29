import React, { ReactEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';

function CartItem({ product }: any) {
  const { removeFromCart, itemQuantity, updateCartItem } = useCart();

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    updateCartItem(product.id, + e.currentTarget.value)
  }
  
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

        <form className="text-sm text-center border rounded-lg w-24 p-1 bg-gray-100 drop-shadow">
            <label htmlFor="Qty">Qty: </label>
            <select
              onChange={handleChange}
              name="quantity"
              id="Qty"
              className="bg-gray-100 pl-2"
              value={itemQuantity(product.id)}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </form>

          <button onClick={() => removeFromCart(product.id)} className='px-3 text-sm text-indigo-500 hover:underline' >Remove from Cart</button>
        </div>


      </section>
      <section className='text-right'>
        <h3 className='text-md font-bold'>{product.price}</h3>

      </section>
    </article>
  );
}

export default CartItem;
