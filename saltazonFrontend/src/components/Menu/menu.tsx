import React from 'react';
import { GrFormNext } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { categories } from '../utils/categories';
import useAuth from '../hooks/useAuth';
import useSearch from '../hooks/useSearch';

const Menu = ({ isOpen }) => {
  const { user } = useAuth();
  const { setCategory } = useSearch();

  return (
    <>
      <aside className={`fixed z-50 top-0 left-0 w-screen h-screen ${isOpen ? 'visible': 'invisible'}`}>
        <section className={`overflow-scroll w-80 h-full absolute left-0 top-0 text-white bg-white z-10 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-500`}>
          <Link to="/login" className='h-14 pl-10 bg-gray-800 flex items-center'>
            <FaUserCircle className='text-3xl' />
            {
              user.accessToken ?
              <h1 className='text-xl inline-flex pl-3'>Welcome, {user.emailAddress}</h1>
              :
              <h1 className='text-xl inline-flex pl-3'>Welcome, LogIn</h1>
            }
          </Link>

          <div className=''>
            <h2 className='text-black px-10 pt-5 text-lg font-semibold'>Programs & Features</h2>
            <ul className='text-gray-800'>
              <Link to="">
                <li className='hover:bg-gray-200 pl-10 h-10 flex items-center justify-between group'>
                  Gift Cards
                  <MdOutlineNavigateNext className='text-2xl text-gray-500 mr-5 group-hover:text-black'/>
                </li>
              </Link>
              <Link to="">
                <li className='hover:bg-gray-200 pl-10 h-10 flex items-center justify-between group'>
                  International Shopping
                  <MdOutlineNavigateNext className='text-2xl text-gray-500 mr-5 group-hover:text-black'/>
                </li>
              </Link>
              <Link to="">
                <li className='hover:bg-gray-200 pl-10 h-10 flex items-center justify-between'>
                  Shop By Interest
                </li>
              </Link>
              <Link to="">
                <li className='hover:bg-gray-200 pl-10 h-10 flex items-center justify-between group'>
                  Saltazon Live
                  <MdOutlineNavigateNext className='text-2xl text-gray-500 mr-5 group-hover:text-black'/>
                </li>
              </Link>
            </ul>
          </div>
          <hr />
          <div>
            <h2 className='text-black px-10 pt-2 text-lg font-semibold'>Shop By Department</h2>
            <ul className='text-gray-800'>
            {
              categories.map((category: string):JSX.Element => (
                <Link 
                  onClick={() => setCategory(category)} 
                  to="/productList"
                  key={category}  
                >
                  <li className='hover:bg-gray-200 pl-10 h-10 flex items-center justify-between group'>
                    {category}
                    <MdOutlineNavigateNext className='text-2xl text-gray-500 mr-5 group-hover:text-black'/>
                  </li>
                </Link>
              ))
            }
            </ul>
          </div>
        </section>
        <section className={`w-full h-full top-0 left-0 bg-gray-800 ${isOpen ? 'opacity-70': 'opacity-0'}  ease-in-out duration-500`}></section>
      </aside>
    </>
  )
}

export default Menu