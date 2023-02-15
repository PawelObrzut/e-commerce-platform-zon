import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation--sections">
        <li>
          <Link to={'/cart'} className={"nav_button"}>Cathegories</Link>
        </li>
        <li>
          <Link to={'/'} className={"nav_button"}>SHOW ME ALL THE ITEMS</Link>
        </li>
        <li>
          <Link to={'/login'} className={"nav_button"}>LogIn</Link>
        </li>
        <li>
          <Link to={'/cart'} className={"nav_button"}>Go to cart</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation