import { useShoppingCart } from '../Hooks/ShopptingCartContext';
import './Cart.css';
import CartItemComponent from './CartItemComponent';

const Cart = () => {
  const { cartItems } = useShoppingCart();

  return (
    <section className="cart">
      <ul className="cart--list">
        { cartItems.map((item) => (
          <CartItemComponent key={item.id} id={item.id} quantity={item.quantity} />
        )) }
      </ul>
    </section>
  )
}

export default Cart;
