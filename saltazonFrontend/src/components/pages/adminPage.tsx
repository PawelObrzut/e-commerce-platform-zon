import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import Spinner from '../Spinner/spinner';
import { baseURL } from '../utils/api';
import { ProductInterface } from '../../types';
import { RiCloseCircleLine } from 'react-icons/ri';
import axios from 'axios';
import DeleteModal from '../DeleteModal/deleteModal';

interface StoreInterface {
  uniqueStoreId: number,
  storeName: string,
  products: ProductInterface[]
}

const AdminPage = () => {
  const { user } = useAuth();
  const [updates, setUpdates] = useState<Partial<ProductInterface>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectProduct, setSelectProduct] = useState<number>(null);
  const url = `${baseURL}/store/${user.storeId}`;
  const { data, isLoading, error, setData } = useFetch<StoreInterface>(url);

  const [ showSpinner, setShowSpinner] = useState(false);

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

  return (
    <main className='min-h-screen p-5'>
      <section className='p-5 mb-2 bg-slate-50'>
        <h2 className='text-2xl'>Store Panel</h2>
        <hr />
        <p>StoreId: {data.uniqueStoreId}</p>
        <p>StoreName: {data.storeName}</p>
      </section>

      <section className='p-5 mb-2 bg-slate-50'>
        <h3>Add New Item Form</h3>
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
