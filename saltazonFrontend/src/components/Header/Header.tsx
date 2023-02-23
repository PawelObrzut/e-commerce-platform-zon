import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { decodeJwt } from '../utils/decodeJWT';
import './Header.css';

const Header = () => {
  const [role, setRole] = useState();

  useEffect(() => {
   const info:any = Cookies.get('credentials');
   if (info) {
     const {role} = decodeJwt(info)
     setRole(role);
   }
  },[])

  const handleLogOut = () => {
    Cookies.remove('credentials');
    window.location.href = '/login';
  }

  return (
    <header className="header">
      <h1>Saltazon</h1>
      <div className="header--buttons">
        {Cookies.get('credentials') && <button className="logOut--btn" onClick={handleLogOut}>Log out</button>}
        {role=== 'admin' && 
          <Link to={'/store'}><button className="logOut--btn">Your Store Settings</button></Link>}
      </div>
    </header>
  )
}

export default Header