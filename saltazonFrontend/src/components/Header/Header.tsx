import React from 'react';
import { BsCart2 } from 'react-icons/bs';
import { RiLoginBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useProduct } from '../context/productContext';

const Header = () => {
  const {
    categories,
  } = useProduct();

  return (
    <header className='bg-black h-22 flex justify-between'>
    <Link to="/"><img src={logo} alt='logo' className='h-16' /></Link>
    <div className="inline-flex shadow-sm rounded-md bg-white self-center" role="group">
      <select className='bg-gray-300 h-10 self-center rounded-l-md text-xs pl-2 pr-2' >
        <option value="All Categories">All Categories</option>
        {
          categories.map((category: string): JSX.Element => (
            <option key={category} value={category}>{category}</option>
          ))
        }
      </select>
      <input type='text' placeholder='Search Saltazon' className='text-xs pl-4 w-80' />
      <button type="button" className='bg-orange-500 text-black w-10 items-center inline-flex justify-center rounded-r-md'>
        <svg className="h-4 w-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
    </div>
    <div className='text-white self-center cursor-pointer hover:text-orange-500'>
      <Link to="/login" className='inline-flex'><span className='mr-1'>Login</span><RiLoginBoxLine className='text-2xl'/></Link>
    </div>
    <div className='text-white self-center inline-flex cursor-pointer mr-16 relative hover:text-orange-500 group'>
      <span className='mr-1'>Cart</span><BsCart2 className='text-2xl'/><span className='text-orange-500 group-hover:text-white bg-black text-lg h-5 absolute bottom-2.5 right-1.5'>6</span>
    </div>
  </header>
  );
};

export default Header;
