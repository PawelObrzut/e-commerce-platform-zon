import './ProductPage.css';
import useStore from '../Hooks/store';

const ProductPage = () => {
  const store = useStore();

  return (
    <article className="product--page">

      <div className="product--page__img">
        <img src={store.product.imageUrl} alt={store.product.title}/>
      </div>
      <div className="product--page__article">
        <h3>{store.product.title}</h3>
        <p>{store.product.description}</p>
        <p>Price: {store.product.price}</p>
        <p>Quantity: {store.product.quantity}</p>

        <button className="product--page__buy" onClick={() => store.addToCart(store.product.id)}>Add To Basket</button>
      </div>
    </article>
  )
}

export default ProductPage