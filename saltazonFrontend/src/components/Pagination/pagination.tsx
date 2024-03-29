import React from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr';
import useSearch from '../hooks/useSearch';
import { baseURL } from '../utils/api'

interface PaginationInterface {
  setUrl: React.Dispatch<React.SetStateAction<string>>,
  count: number,
  limit: number,
  next: number,
  page: number,
}

const Pagination = ({ setUrl, count, limit, next, page }: PaginationInterface) => {
  const { category, inputValue } = useSearch();
  
  const handleNextPage = () => {
    setUrl(`${baseURL}/product?page=${next}&limit=12&category=${category}&searchQuery=${inputValue.current.value}`)
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    setUrl(`${baseURL}/product?page=${page - 1}&limit=12&category=${category}&searchQuery=${inputValue.current.value}`)
    window.scrollTo(0, 0);
  };

  return (
    <div className='col-span-4 mx-auto border border-gray-400 rounded-md m-2 h-14 inline-flex '>
      {page === 1 ?
        <button disabled className='p-3 border-r border-r-gray-200 inline-flex'>
          <GrPrevious className='relative top-[16%]' /><span>Previous</span>
        </button>
        :
        <button onClick={handlePreviousPage} className='hover:bg-gray-200 hover:cursor-pointer p-3 border-r border-r-gray-200 inline-flex'>
          <GrPrevious className='relative top-[16%]' /><span>Previous</span>
        </button>
      }
      { page > 1 && <div className='px-5 py-3'> {page -1} </div>}
      <div className='hover:bg-gray-200 px-5 py-3 border border-black'> {page} </div>
      <div className='px-5 py-3'> {next} </div>
      <div className='px-5 py-3 text-gray-400'> ... {Math.ceil(count / limit)}  </div>

      {next ?
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

export default Pagination;
