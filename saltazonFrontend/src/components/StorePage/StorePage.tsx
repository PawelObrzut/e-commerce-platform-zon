import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductInterface } from '../Hooks/store';
import { decodeJwt } from '../utils/decodeJWT';
import './StorePage.css';

interface AddProductInterface {
  title: string,
  description: string,
  imageUrl: string,
  price: string,
  quantity: number,
  category: string,
}

const StorePage = () => {
  const token = Cookies.get('credentials');
  const info:any = Cookies.get('credentials');
  const {storeId} = decodeJwt(info)

  const [storeName, setStoreName] = useState('');
  const [products, setProducts] = useState<ProductInterface[]>([])

  const getProducts = (storeId: any, token: any) => {
    fetch(`http://localhost:8080/store/${storeId}`, {
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
    fetch(`http://localhost:8080/product/${id}`, {
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

  const { register, handleSubmit, reset } = useForm<AddProductInterface>()

  const handleSubmitNewProduct = ({title, description, imageUrl, price, quantity, category}: AddProductInterface) => {
    fetch(`http://localhost:8080/store/${storeId}/product`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title, description, imageUrl, price, quantity, category, storeId
      })
    })
      .then(() => getProducts(storeId, token))
    reset();
  }

  return (
    <main className="store">
      <h2>{storeName}</h2>

      <section>
        <form className="store--addProduct" onSubmit={handleSubmit(handleSubmitNewProduct)}>
          <legend>Add a new product to Your store</legend>
          <input type="text" placeholder="title" {...register("title")} />
          <textarea placeholder="description" {...register("description")} />
          <input type="text" placeholder="imageUrl" {...register("imageUrl")} />
          <input type="text" placeholder="price" {...register("price")} />
          <input type="number" placeholder="quantity" {...register("quantity")} />
          <select {...register("category")}>
            <option value="Movies">Movies</option>
            <option value="Shoes">Shoes</option>
            <option value="Grocery">Grocery</option>
            <option value="Toys">Toys</option>
            <option value="Sports">Sports</option>
            <option value="Baby">Baby</option>
            <option value="Beauty">Beauty</option>
            <option value="Games">Games</option>
          </select>
          <input type="submit" value="Add the product" />
        </form>
      </section>

      <ul className="store--products">
      Products: {products.length}
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