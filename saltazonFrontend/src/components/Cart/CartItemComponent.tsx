import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useShoppingCart } from '../Hooks/ShopptingCartContext';
import { ProductInterface } from '../Hooks/store';
import { CartItem } from '../Hooks/store';

const CartItemComponent = ({ id, quantity }: CartItem) => {
  const { removeFromCart, addToCart } = useShoppingCart();
  const token = Cookies.get('token');
  const [product, setProduct] = useState<ProductInterface>()

  useEffect(() => {
    fetch(`http://localhost:8080/product/${id.toString()}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setProduct(data))
  }, [])

  return (
    <li className="cart--list__item">
      <img src={product?.imageUrl} alt={product?.title} />
      <div className="cart--item__details">
        <h4>{product?.title}</h4>
        <p>Price: {product?.price}</p>
        <p>Quantity: {quantity}</p>
        
      </div>
      
      <div className="item--buttons">
        <button className="cart--item__btn" onClick={() => removeFromCart(id)} >Remove One</button>
        <button className="cart--item__btn" onClick={() => addToCart(id)} >Add One More</button>
      </div>
    </li>
  )
}

export default CartItemComponent