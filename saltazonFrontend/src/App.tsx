/* eslint-disable no-tabs */
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import React from 'react';
import NavBar from './components/Navbar/navbar';
import Cart from './components/Cart/cart';
import AdminPage from './admin/AdminPage';
import SuperAdminPage from './admin/SuperAdminPage';
import ProductPage from './components/pages/productpage';
import HomePage from './components/pages/homePage';
import LoginPage from './components/pages/loginPage';
import ProductListPage from './components/pages/productListPage';
import StorePage from './components/pages/storepage';
import ProtectedRoutes from './components/ProtectedRoutes/RequireAuth';
import Footer from './components/Footer/footer';
import './App.css';

function App() {

	return (
		<>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/login' element={ <LoginPage /> }></Route>
					<Route path='/' element={ <HomePage /> }></Route>

					<Route element={<ProtectedRoutes />} >
						<Route path='/productList' element={ <ProductListPage /> }></Route>
						<Route path='/productList/:id' element={ <ProductPage /> }></Route>
						<Route path='/cart'	element={	<Cart/> }></Route>
						<Route path='/store/:id' element={ <StorePage /> }></Route>
						<Route path='/admin' element={ <AdminPage /> }></Route>
						<Route path='/admin/super' element={ <SuperAdminPage /> }></Route>
					</Route>

				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
