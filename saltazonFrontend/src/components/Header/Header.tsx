import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';

const Header = () => {
  const { cartQuantity } = useCart();
  const { categories } = useProducts();

  const handleLogOut = () => {

  }

  return (
    <header className='bg-black px-4 py-2 h-16 flex justify-between'>
      <Link to="/" className='self-center  hover:border-white border border-transparent'>
        <img src={logo} alt='logo' className='h-12' />
      </Link>
      <div className="inline-flex shadow-sm rounded-md bg-white self-center" role="group">
        <select className='bg-gray-300 h-10 self-center rounded-l-md text-xs pl-2 pr-2' >
          <option value="All Categories">All Categories</option>
          {
            categories.map((category: string): JSX.Element => (
              <option key={category} value={category}>{category}</option>
            ))
          }
        </select>
        <input type='text' placeholder='Search Saltazon' className='text-xs pl-4 w-96' />
        <button type="button" className='bg-orange-500 text-black w-10 items-center inline-flex justify-center rounded-r-md'>
          <svg className="h-4 w-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>

      {
        // user.email ?
        // <div onClick={handleLogOut} className='cursor-pointer p-1 text-white self-center text-sm flex hover:border-white border border-transparent'>
        //   <span>
        //     Hello, <br />
        //     {user.email} 
        //   </span>
        //   <span className='pl-3'>
        //     <RiLogoutBoxLine className='text-2xl' /> Logout
        //   </span>
        // </div>
        // :
        <Link to="/login" className='h-14  p-4 text-white self-center inline-flex hover:border-white border border-transparent'>Login <RiLoginBoxLine className='text-2xl' /></Link>
      }

      <Link to="/cart" className='text-white h-14 self-center p-5 inline-flex relative hover:border-white border border-transparent'>
        <span className='mr-1 self-center'>Cart</span>
        <BsCart2 className='text-2xl self-center' />
        <span className='text-orange-500 bg-black text-lg h-5 absolute top-2 right-6'>{cartQuantity}</span>
      </Link>
    </header>
  );
};

export default Header;
