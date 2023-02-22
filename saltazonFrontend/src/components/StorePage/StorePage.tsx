import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ProductInterface } from '../Hooks/store';
import './StorePage.css';

const StorePage = () => {
  const storeId = Cookies.get('storeId');
  const token = Cookies.get('token');
  const [storeName, setStoreName] = useState('');
  const [products, setProducts] = useState<ProductInterface[]>([])

  const getProducts = (storeId: any, token: any) => {
    fetch(`http://localhost:8080/store/${storeId.toString()}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setStoreName(data.store);
        setProducts(data.products);
      })
  }

  useEffect(() => {
    getProducts(storeId, token);
  },[])


  const handleDeleteProduct = (id: number) => {
    fetch(`http://localhost:8080/product/${id.toString()}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        getProducts(storeId, token);
      })
  }

  return (
    <main className="store">
      <h2>{storeName}</h2>
        Products: {products.length}
      <section>
        <form>
          
        </form>
      </section>
      <ul className="store--products">
        {products.map(product => (
          <li className="store--product__item" key={product.id}>
            <img src={product.imageUrl} alt={product.title} />
            <div className="store--product__item-details">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            <button className="store--product__deleteBtn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default StorePage