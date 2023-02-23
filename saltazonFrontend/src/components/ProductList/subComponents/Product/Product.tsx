import './Product.css';
import useStore, { ProductInterface } from '../../../Hooks/store';
import { Link } from 'react-router-dom';

const Product = ({ id, title, description, imageUrl, storeId, price, quantity, category}: ProductInterface) => {
  const store = useStore();

  // !! should have useEffect and on refresh always fetch for the product data.
  
  return (
    <Link to={`/${id}`} style={{ textDecoration: 'none' }} onClick={() => store.setProduct(id)}>
      <article className="product">
        <img className="product--photo__img" src={imageUrl} alt={title} />
          <div className="product--cathegory">
            <span>{category}</span>
          </div>
          <h3 className="product--title">{title}</h3>
          <p className="product--description">{description}</p>
          <div className="product--footer">
            <div className="product--price"><span>Price: {price}</span></div>
            <div className="product--quantity"><span>In stock: {quantity}</span></div>
          </div>
      </article>
    </Link>
  )
}

export default Product