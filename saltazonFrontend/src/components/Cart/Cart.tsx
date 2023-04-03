import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import CartItem from './CartItem';


function Cart() {
  const { cartItems: products, cartQuantity, cartValue } = useCart();
  
  if (products.length === 0) {
    return (
      <main className='h-screen w-screen text-center p-16'>
        <h3 className='text-2xl'>No items in cart, why not add some?</h3>
        <Link to="/productList">
          <button className='m-2 bg-yellow-400 rounded p-5 hover:bg-yellow-500'>Browse through our products!</button>
        </Link>
      </main>
    )
  }
  return (
    <main className='m-4 grid grid-cols-4 gap-5 pb-10'>
      <section className='col-span-3 bg-slate-50 p-5 pb-10'>
        <h2 className='text-2xl'>Shopping Cart</h2>
        <span className='float-right text-sm text-gray-600'>Price</span>
        <br />
        <hr />
        {
          products
            .map((p: any) => {
              return (
                <CartItem 
                  key={p.id}
                  product={p}
                />
              );
            })
        }
        <h3 className='float-right text-lg'>Subtotal ({cartQuantity} items): <span className='font-bold'>${cartValue.toFixed(2)}</span></h3>
      </section>
      <aside className='bg-slate-50 h-56 p-5 text-center'>
        <div className='inline-flex '>
          <h2 className='text-xl pr-2'>Subtotal ({cartQuantity} items):</h2><span className='text-lg font-bold'>${cartValue.toFixed(2)}</span>
        </div>
        <button className='text-center text-sm rounded-lg my-5 w-full p-1 bg-yellow-400 hover:bg-yellow-500'>Proceed to checkout</button>
        <Link to="/productList">
          <button className='text-center text-sm rounded-lg my-5 w-full p-1 bg-yellow-400 hover:bg-yellow-500'>Continue Shopping</button>
        </Link>
      </aside>

    </main>);
}

export default Cart;
