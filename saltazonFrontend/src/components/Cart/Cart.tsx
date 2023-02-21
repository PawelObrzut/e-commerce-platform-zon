import { useShoppingCart } from '../Hooks/ShopptingCartContext';
import { CartItem } from '../Hooks/store';
import './Cart.css';
import CartItemComponent from './CartItemComponent';

const Cart = () => {
  const { cartItems } = useShoppingCart();
  console.log(cartItems);
  
  return (
    <section className="cart">
      <ul>
        { cartItems.map((item: CartItem) => (
          <CartItemComponent key={item.id} id={item.id} quantity={item.quantity}/>
        )) }
      </ul>
    </section>
  )
}

export default Cart;
