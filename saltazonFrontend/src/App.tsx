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
import ProductList from './components/Products/ProductList';
import NewUserForm from './components/Login/NewUserForm';
import SuperAdminPage from './admin/SuperAdminPage';
import Carousel from './components/Carousel/Carousel';
import Card from './components/Card/Card';
import { fakeProducts } from '../src/fakedata/fakedata';


import electronics from '../src/images/t_electronics.png';
import youth from '../src/images/t_youth.png';
import apple from '../src/images/t_apple.png';
import getFit from '../src/images/t_get-fit.png';
import books from '../src/images/t_books.png';
import shoes from '../src/images/t_shoes.png';
import deals from '../src/images/t_deals.png';
import easyReturn from '../src/images/t_return.png';
import Login from './components/Login/Login';

function addToCart() {
	// add item to the current Cart
}

function removeFromCart() {
	// remove item from the current Cart
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCurrentCart() {
	// return fakecart;
	// update to get from localstorage
}

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
					<Route path='/create-new-user' element={< NewUserForm />}></Route>
					<Route
						path='/login'
						element={
							<div className='bg-gradient-to-r from-[#fcf2d4] to-[#f0d0ac]'>
								<Login />
							</div>
						}
					></Route>
					<Route
						path='/'
						element={
							<>
								<Carousel />
								<main className='grid grid-cols-3 gap-5 -mt-36 mx-auto w-[98%] z-10 relative lg:grid-cols-4 pb-5'>
									<Card title="Top Deals" img={<img src={deals} alt="deals" />} linkTitle="See all the deals" />
									<Card title="Electronics" img={<img src={electronics} alt="electronics" />} linkTitle="See more" />
									<Card title="Shoes" img={<img src={shoes} alt="shoes" />} linkTitle="Shop now" />
									<Card title="Books" img={<img src={books} alt="books" />} linkTitle="Shop now" />
									<Card title="Get fit at home" img={<img src={getFit} alt="get fit" />} linkTitle="Explore now" />
									<Card title="Youth " img={<img src={youth} alt="youth" />} linkTitle="Shop now" />
									<Card title="Apple " img={<img src={apple} alt="things" />} linkTitle="Shop now" />
									<Card title="Easy Return  " img={<img src={easyReturn} alt="return" />} linkTitle="Learn more" />
								</main>
							</>
						}
					></Route>

					<Route
						path='/productList'
						element={
							<div className='bg-gray-50'>
								<ProductList
									products={fakeProducts}
									addToCart={addToCart}
								/>
							</div>
						}
					></Route>
					<Route
						path='/cart'
						element={
							<Cart
								// products={currentCart}
								removeFromCart={removeFromCart} />}
					>
					</Route>
					<Route path='/admin' element={< AdminPage />}></Route>
					<Route path='/admin/super' element={< SuperAdminPage />}></Route>
				</Routes>
				<div onClick={() => { window.scrollTo(0, 0) }} className='text-sm text-white text-center bg-gray-700 w-full p-4 cursor-pointer hover:bg-gray-600'>Back to top</div>
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
