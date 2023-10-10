import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import Spinner from '../Spinner/spinner';
import { baseURL } from '../utils/api';
import { ProductInterface } from '../../types';
import { RiCloseCircleLine } from 'react-icons/ri';
import axios from 'axios';
import DeleteModal from '../DeleteModal/deleteModal';
import { categories } from '../utils/categories';
import { useForm } from 'react-hook-form';

interface StoreInterface {
  uniqueStoreId: number,
  storeName: string,
  products: ProductInterface[]
}

interface AddNewItemInterface {
  title: string,
  description: string,
  price: string,
  quantity: number,
  category: string,
  imageUrl: string
}

const AdminPage = () => {
  const { user } = useAuth();
  const url = `${baseURL}/store/${user.storeId}`;
  const { register, handleSubmit, reset } = useForm<AddNewItemInterface>({
    
  });
  const { data, isLoading, error, setData } = useFetch<StoreInterface>(url);

  const [updates, setUpdates] = useState<Partial<ProductInterface>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectProduct, setSelectProduct] = useState<number>(null);

  const [showSpinner, setShowSpinner] = useState(false);

  if (isLoading) {
    return (
      <main className='flex items-center justify-center h-[70vh]'>
        <Spinner />
      </main>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleUpdate = (productId: number, field: keyof ProductInterface, value: string | number) => {
    setUpdates({
      ...updates,
      [productId]: {
        ...updates[productId],
        [field]: value,
      },
    });
  }

  const handleSave = (productId: number) => {
    setShowSpinner(true);
    axios({
      method: 'patch',
      url: `${baseURL}/product/${productId}`,
      data: updates[productId],
      headers: {
        'Authorization': 'Bearer ' + user?.accessToken
      }
    })
      .then(response => {
        if (response.status === 200) {
          const productIndex = data.products.findIndex(product => product.id === productId);

          const updatedProduct = {
            ...data.products[productIndex],
            quantity: updates[productId].quantity,
            price: updates[productId].price,
          };
  
          const updatedProducts = [...data.products];
          updatedProducts[productIndex] = updatedProduct;
  
          setData({
            ...data,
            products: updatedProducts
          });
  
          delete updates[productId];

        } else {
          console.log('unable to update the product');
        }
        setShowSpinner(false);
      })
      .catch(error => console.log(error));
  }

  const handleShowModal = (productId: number) => {
    setConfirmDelete(true)
    setSelectProduct(productId);
  }

  const handleDelete = (productId: number) => {
    axios({
      method: 'delete',
      url: `${baseURL}/product/${productId}`,
      headers: {
        'Authorization': 'Bearer ' + user?.accessToken
      }
    })
      .then(response => {
        if (response.status === 204) {
          setData({
            ...data,
            products: data.products.filter(
              (product: ProductInterface) => product.id !== productId
            )
          });
        } else {
          console.log(`Error deleting product with ID ${productId}.`);
        }
      })
      .catch(error => console.log(error));
  }

  const submitNewProduct = async ({ title, description, price, quantity, category, imageUrl }: AddNewItemInterface) => {
    const newProduct = {
      title, description, price: `$${price}`, quantity: +quantity, category, imageUrl, storeId: user.storeId
    }
    axios({
      method: 'post',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user?.accessToken
      },
      url: `${baseURL}/product/`,
      data: newProduct
      
    })
      .then(response => {
        if (response.status === 201) {
          const newProducts = [...data.products, { ...newProduct, id: response.data.id}];
          setData({
            ...data,
            products: newProducts
          });
        }
      })
      .catch(error => console.log(error));
    reset();
  }

  return (
    <main className='min-h-screen p-5'>
      <section className='p-5 mb-2 bg-slate-50'>
        <h2 className='text-2xl'>Store Panel</h2>
        <hr />
        <p>StoreId: {data.uniqueStoreId}</p>
        <p>StoreName: {data.storeName}</p>
      </section>

      <section className='p-5 pb-16 bg-slate-50'>
        <h3 className='text-center mb-2'>Add New Item Form</h3>
        <form 
          className='w-3/4 mx-auto' 
          onSubmit={handleSubmit(submitNewProduct)}
        >
          <input 
            {...register("title")} 
            type="text" id="title" 
            className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="title"
            required />
          <textarea 
            {...register("description")}
            id="description"
            className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="description"
            required />
          <div className='grid md:grid-cols-3 md:gap-6'>

            
            <div className="flex">
              <span className="mb-2 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                $
              </span>
              <input 
                {...register("price")}
                type='text' id='price' 
                className="mb-2 rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Price" 
                required/>
            </div>
            
            <input 
              {...register("quantity")} 
              type='number' id='quantity' 
              className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
              placeholder="quantity" required />
            <select 
              {...register("category")} 
              id="category" 
              className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
              required>

              {
                categories.map((category: string) => (
                  <option key={category} value={category}>{category}</option>
                ))
              }
            </select>

          </div>
          <input 
            {...register("imageUrl")} 
            type="text" id="imageUrl" 
            className="mb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            placeholder="imageUrl" required />
            
          <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </section>

      <section>
        <table className='w-full'>
          <thead className='sticky top-0 bg-slate-300 bg-opacity-90'>
            <tr>
              <th className='p-2 font-normal'>Del</th>
              <th className='p-2 font-normal'>Image</th>
              <th className='p-2 font-normal'>Id</th>
              <th className='p-2 font-normal'>Title</th>
              <th className='p-2 font-normal'>Description</th>
              <th className='p-2 font-normal'>Quantity</th>
              <th className='p-2 font-normal'>Price</th>
              <th className='p-2 font-normal'>Category</th>
              <th className='p-2 font-normal'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.products.map((product: ProductInterface) => (
                <tr key={product.id} className='hover:bg-gray-100 '>
                  <td className='p-2'>
                    <RiCloseCircleLine onClick={() => handleShowModal(product.id)} size={30} className='text-blue-600 hover:text-red-600 cursor-pointer' />
                    { confirmDelete && <DeleteModal handleDelete={handleDelete} setConfirmDelete={setConfirmDelete} product={selectProduct} /> }
                  </td>
                  <td><img src={product.imageUrl} alt="product" className='h-32 object-scale-down mx-auto' /></td>
                  <td className='p-2'>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>
                    <input 
                      type="number" 
                      value={updates[product.id]?.quantity ?? product.quantity}
                      className='w-1/2'
                      onChange={(e) =>
                        handleUpdate(product.id, 'quantity', +(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={updates[product.id]?.price ?? product.price}
                      className='w-[80%]'
                      onChange={(e) =>
                        handleUpdate(product.id, 'price', (e.target.value))
                      }
                    />
                  </td>
                  <td>{product.category}</td>
                  <td>
                    {
                      showSpinner 
                        ? <Spinner />
                        : updates[product.id] &&  <button onClick={() => handleSave(product.id)} className='block p-2 border rounded-md bg-orange-300 hover:bg-orange-400'>Save</button>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </main>
  );

}

export default AdminPage;
