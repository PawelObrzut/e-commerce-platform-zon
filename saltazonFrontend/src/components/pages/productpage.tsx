import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GrPrevious } from 'react-icons/gr';
import { ProductInterface } from '../../types';
import useFetch from '../hooks/useFetch';
import useCart from '../hooks/useCart';
import { baseURL } from '../utils/api';
import PriceLabel from '../Products/pricelabel';
import Spinner from '../Spinner/spinner';

interface ProductPageInterface {
  responseData: ProductInterface,
}

const ProductPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { data, isLoading, error } = useFetch<ProductPageInterface>(`${baseURL}/product/${productId}`);

  const product = data?.responseData

  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (e: React.FormEvent<HTMLSelectElement>) => {
    setQuantity(+e.currentTarget.value);
  };

  if (isLoading) {
    return (
      <main className='flex items-center justify-center h-[70vh]'>
        <Spinner />
      </main>
    )
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className='w-full pb-10 bg-white'>
      <p className='inline-flex text-xs p-3'>
        <GrPrevious size={7} className='relative top-1 mr-2' />
        <button onClick={() => navigate(-1)}>Back to results</button>
      </p>
      <section className='w-full pl-28 grid grid-cols-4 gap-2'>
        <img src={product.imageUrl} alt={product.title} className='w-full' />
        <article className='col-span-2 pl-2'>
          <h2 className='text-xl font-semibold'>{product.title}</h2>
          <p className='py-5'>{product.description}</p>

          <Link to={`/store/${product.storeId}`} className='text-sm text-blue-500 hover:text-red-500 hover:underline'>Visit the Store</Link>

          <hr className='w-11/12 py-1' />
          <PriceLabel product={product} />
          <ul className='list-disc pl-4'>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores deserunt inventore vero culpa adipisci minus nostrum nisi, saepe eos. Ad dolores nobis, harum at libero quaerat saepe exercitationem eaque explicabo.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta vero magnam voluptatibus ullam quo, delectus ipsam accusantium neque magni, expedita dolore quibusdam, inventore excepturi distinctio cupiditate amet odit. Cumque, atque?</li>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, maiores? Ipsam officiis tempora minima cumque sit rerum ipsa nesciunt, ipsum doloremque, accusamus id delectus enim libero quae magni earum harum!</li>
          </ul>
        </article>
        <aside className='border rounded border-gray-300 p-5 h-3/4'>
          <PriceLabel product={product} />
          <p className='text-xs text-gray-500'>No Import Fees Deposit & $15.00 Shipping to Sweden</p>
          {product.quantity > 0 && <p className='text-md text-green-600 py-3'>In Stock</p>}

          <form className='text-xs text-center border rounded-l-full rounded-r-full w-2/5 bg-gray-100'>
            <label htmlFor="Qty">Qty:</label>
            <select onChange={handleQuantity} name="quantity" id="Qty" className='bg-gray-100 pl-2'>
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </form>
          
          <button 
            className='my-5 text-sm text-center bg-yellow-300 rounded-l-full rounded-r-full w-full p-1 hover:bg-yellow-400'
            onClick={() => addToCart({id: product.id, imageUrl: product.imageUrl, title: product.title, price: product.price, stock: product.quantity, quantity})}
          >
            Add to Cart
          </button>
        </aside>
      </section>
    </main>
  )
}

export default ProductPage;
