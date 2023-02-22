import Cookies from 'js-cookie'

const Header = () => {
  const handleLogOut = () => {
    Cookies.remove('token')
    Cookies.remove('email')
    window.location.href = '/login';
  }

  return (
    <header className="header">
      <h1>Saltazon</h1>
      {Cookies.get('token') && <button className="logOut--btn" onClick={handleLogOut}>Log out</button>}
    </header>
  )
}

export default Header