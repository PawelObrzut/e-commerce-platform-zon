import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import Spinner from '../Spinner/spinner';
import { baseURL } from '../utils/api';
import { ProductInterface } from '../../types';
import { fakeProducts } from '../../fakedata/fakedata';

interface StoreInterface {
  uniqueStoreId: number,
  storeName: string,
  products: ProductInterface[]
}

const AdminPage = () => {
  const { user } = useAuth();
  const [updates, setUpdates] = useState<Partial<ProductInterface>>({});

  const handleUpdate = (productId: number, field: keyof ProductInterface, value: string | number) => {
    setUpdates({
      ...updates,
      [productId]: {
        ...updates[productId],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    console.log('not implemented yet')
  }

  const url = `${baseURL}/store/${user.storeId}`;
  const { data, isLoading, error } = useFetch<StoreInterface>(url);

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

  // console.log(fakeProducts);
  // useEffect(() => {
  //   console.log(updates);
  // }, [updates])

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
          <thead className='border border-black '>
            <tr>
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
                  <td><img src={product.imageUrl} alt="product" className='h-32 object-scale-down mx-auto' /></td>
                  <td>{product.id}</td>
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
                    <button onClick={handleSave} className='block p-2 border rounded-md'>Save</button>
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
