import React from 'react';
import CartItem from './CartItem';

let sumOfItems = 0;
function Cart({ products, removeFromCart }: any) {
  if (products.length === 0) {
    return <h3>No items in cart, why not add some?</h3>;
  }
  return (
      <div>{
        products
          .map((p: any) => {
            sumOfItems += (p.price * p.amount);
            return (
                  <CartItem key={p.id}
                           product={p}
                  removeFromCart={removeFromCart}/>
            );
          })
      }
      <h3>Total price for items: {sumOfItems}</h3>
      </div>);
}

export default Cart;
