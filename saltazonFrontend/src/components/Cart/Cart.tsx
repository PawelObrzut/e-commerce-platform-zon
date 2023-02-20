import './Cart.css';

const Cart = () => {
  return (
    <section className="cart">
      <h3>Your Cart is empty</h3>
      <div>
        <p>Title, price, quantity_______________€ 4,90</p>
        <p>Title, price, quantity_______________€ 6,20</p>
        <p>Title, price, quantity_______________€ 12,10</p>
        <p>______________________________________</p>
        <p>____________________________total: € 23.20</p>
      </div>
    </section>
  )
}

export default Cart