import React from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr';
import { useProduct } from '../context/productContext';

const Pagination = () => {
  const { details, setUrlPage } = useProduct();

  const handleNextPage = () => {
    setUrlPage(details.next);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    setUrlPage(details.page - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className='col-span-4 mx-auto border border-gray-400 rounded-md m-2 inline-flex '>
      {details.page === 1 ?
        <button disabled className='p-3 border-r border-r-gray-200 inline-flex'>
          <GrPrevious className='relative top-[16%]' /><span>Previous</span>
        </button>
        :
        <button onClick={handlePreviousPage} className='hover:bg-gray-200 hover:cursor-pointer p-3 border-r border-r-gray-200 inline-flex'>
          <GrPrevious className='relative top-[16%]' /><span>Previous</span>
        </button>
      }
      <div className='hover:bg-gray-200 hover:cursor-pointer px-5 py-3 border border-black'> {details.page} </div>
      <div className='hover:bg-gray-200 hover:cursor-pointer px-5 py-3'> {details.next} </div>
      <div className='px-5 py-3 text-gray-400'> ... {Math.ceil(details.count / details.limit)}  </div>

      {details.next ?
        <button onClick={handleNextPage} className='hover:bg-gray-200 hover:cursor-pointer p-3 border-l border-l-gray-200 inline-flex'>
          <span>Next</span><GrNext className='relative top-[16%]' />
        </button>
        :
        <button disabled className='p-3 border-l border-l-gray-200 inline-flex'>
          <span>Next</span><GrNext className='relative top-[16%]' />
        </button>
      }
    </div>
  )
}

export default Pagination