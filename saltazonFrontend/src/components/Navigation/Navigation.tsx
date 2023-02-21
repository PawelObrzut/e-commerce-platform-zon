import './Navigation.css'
import { Link } from 'react-router-dom';
import CategoryDropdown from './CatewgoryDropdown/CategoryDropdown';
import Cookies from 'js-cookie';
import { useShoppingCart } from '../Hooks/ShopptingCartContext';

const Navigation = () => {
  const token = Cookies.get('token');
  const { cartQuantity } = useShoppingCart()

  return (
    <>
      <nav className="navigation">
        <ul className="navigation--sections">
          <li className="dropdown">
            <span className="dropdown--title">Categories</span>
            { token && <CategoryDropdown />}
          </li>

          <li>
            <Link to={'/'} className={"nav_button"}>SHOW ME ALL THE ITEMS</Link>
          </li>
          <li>
            <Link to={'/login'} className={"nav_button"}>LogIn</Link>
          </li>
          <li>
            <Link to={'/cart'} className={"nav_button"}>Go to cart ({cartQuantity})</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation