import './Product.css';
import { ProductInterface } from '../../../Hooks/store';

const Product = ({ id, title, description, imageUrl, storeId, price, quantity, category}: ProductInterface) => {
  return (
    <article className="product">
      <img className="product--photo__img" src={imageUrl} alt={title} />
        <div className="product--cathegory">
          <span>{category}</span>
        </div>
        <h3 className="product--title">{title}</h3>
        <p className="product--description">{description}</p>
        <div className="product--footer">
          <div className="product--price"><span>{price}</span></div>
          <div className="product--quantity"><span>{quantity}</span></div>
          <div className="product--addToBasket"><span>Add to basket</span></div>
        </div>
    </article>
  )
}

export default Product