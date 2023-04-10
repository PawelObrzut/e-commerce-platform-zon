import React, { useState } from 'react';
import Header from '../Header/header';
import Menu from '../Menu/menu';
import ProfileBar from '../ProfileBar/profileBar';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header>
      <Header />
      { <ProfileBar /> }
      <nav className="bg-gray-800 text-gray-50 text-sm h-8 flex items-center justify-between">
        <ul className="flex cursor-pointer">
          <li onClick={() => setIsOpen(!isOpen)} className="pl-2 inline-flex">
            <svg
              className="flex items-center cursor-pointer right-10 top-6"
              fill="#fff"
              viewBox="0 0 100 100"
              width="20"
              height="20"
            >
              <rect width="80" height="8" y="20"></rect>
              <rect width="80" height="8" y="45" ></rect>
              <rect width="80" height="8" y="70" ></rect>
            </svg>

            <span>Menu</span>
            <Menu isOpen={isOpen} />
          </li>
          <li className="pl-4">Bestsellers</li>
          <li className="pl-4">Today's Deals</li>
          <li className="pl-4">Buy Again</li>
          <li className="pl-4">Customer Service</li>
          <li className="pl-4">Gift Cards</li>
          <li className="pl-4">Registry</li>
          <li className="pl-4">Sell</li>
        </ul>
        <Link to="/productList"><span className="ml-auto pr-5">Shop Great Deals Now</span></Link>
      </nav>      
    </header>
  );
}

export default NavBar;
