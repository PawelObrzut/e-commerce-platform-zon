import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const handleLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('email');
    Cookies.remove('role');
    Cookies.remove('storeId');
    window.location.href = '/login';
  }

  return (
    <header className="header">
      <h1>Saltazon</h1>
      <div className="header--buttons">
        {Cookies.get('token') && <button className="logOut--btn" onClick={handleLogOut}>Log out</button>}
        {Cookies.get('role') === 'admin' && 
          <Link to={'/store'}><button className="logOut--btn">Your Store Settings</button></Link>}
      </div>
    </header>
  )
}

export default Header