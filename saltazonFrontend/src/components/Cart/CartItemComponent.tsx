import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useShoppingCart } from '../Hooks/ShopptingCartContext';
import { CartItem } from '../Hooks/store';

const CartItemComponent = ({ id, quantity }: CartItem) => {
  const { removeFromCart, addToCart } = useShoppingCart();

  const token = Cookies.get('token');

  useEffect(() => {
    fetch(`http://localhost:8080/product/${id.toString()}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <li>
      <h3>Item: xxxx</h3>
      <p>ID: {id}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={() => removeFromCart(id)} >Remove One</button>
      <button onClick={() => addToCart(id)} >Add More</button>
    </li>
  )
}

export default CartItemComponent