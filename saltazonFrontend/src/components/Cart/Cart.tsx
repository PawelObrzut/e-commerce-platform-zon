import { useState } from 'react';
import { CartItem } from '../Hooks/store';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item: CartItem) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  return (
    <section className="cart">
      {cart.length === 0 ? <h3>Your cart is empty</h3> : <h3>Your cart:</h3>}
      <ul>
        {cart.map((item: any) => (
          <li key={item.id}>
            <p>Item ID: {item.id}</p>
            <p>Item Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Cart;
