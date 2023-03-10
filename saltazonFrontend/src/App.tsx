/* eslint-disable no-tabs */
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import React from 'react';
import NavBar from './components/Navbar/Navbar';
import Cart from './components/checkout/Cart';
import AdminPage from './admin/AdminPage';
import SuperAdminPage from './admin/SuperAdminPage';
import ProductPage from './components/pages/ProductPage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ProductListPage from './components/pages/ProductListPage';
import { fakecart as currentCart } from '../src/fakedata/fakecart';

function App() {
	// const [currentCart, setCurrentCart] = useState(getCurrentCart());

	return (
		<div className="bg-[#e6e6e6]">
			<Router>
				<header>
					<NavBar />
					{/* <ProfileBar /> */}
				</header>

				<Routes>
					<Route path='/login' element={ <LoginPage /> }></Route>
					<Route path='/' element={ <HomePage /> }></Route>
					<Route path='/productList' element={ <ProductListPage /> }></Route>
					<Route path='/productList/:id' element={ <ProductPage /> }></Route>

					<Route path='/cart'	element={	<Cart
								products={currentCart}
								/> }></Route>

					<Route path='/admin' element={< AdminPage />}></Route>
					<Route path='/admin/super' element={< SuperAdminPage />}></Route>
				</Routes>
				<div onClick={() => { window.scrollTo(0, 0) }} className='text-sm text-white text-center bg-gray-700 w-full p-4 cursor-pointer hover:bg-gray-600'>
					Back to top
				</div>
				<footer className='w-full bg-gray-800 text-center text-white text-xl p-32'>
					To Be Implemented
				</footer>
				<div className='w-full bg-gray-900 text-center text-white text-xl p-20'>

				</div>
			</Router>
		</div>
	);
}

export default App;
