import React from 'react';
import CartItem from './CartItem';

let sumOfItems = 0;
function Cart({ products, removeFromCart }: any) {
  if (products.length === 0) {
    return <h3>No items in cart, why not add some?</h3>;
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
              sumOfItems += (p.price * p.amount);
              return (
                <CartItem key={p.id}
                  product={p}
                  removeFromCart={removeFromCart} />
              );
            })
        }
        <h3 className='float-right text-lg'>Subtotal (2 items): <span className='font-bold'>${sumOfItems}</span></h3>
      </section>
      <aside className='bg-slate-50 h-1/4 p-5 text-center'>
        <div className='inline-flex'>
          <h2 className='text-xl pr-2'>Subtotal (0 Items):</h2><span className='text-lg font-bold'>$19.80</span>
        </div>
        <button className='text-center text-sm rounded-lg my-5 w-full p-1 bg-yellow-400 hover:bg-yellow-500'>Proceed to checkout</button>
      </aside>

    </main>);
}

export default Cart;
