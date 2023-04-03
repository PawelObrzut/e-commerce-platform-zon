/* eslint-disable no-tabs */
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import React from 'react';
import NavBar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import AdminPage from './admin/AdminPage';
import SuperAdminPage from './admin/SuperAdminPage';
import ProductPage from './components/pages/ProductPage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ProductListPage from './components/pages/ProductListPage';
import StorePage from './components/pages/StorePage';
import ProtectedRoutes from './components/ProtectedRoutes/RequireAuth';
import Footer from './components/Footer/Footer';

function App() {

	return (
		<div className="bg-[#e6e6e6]">
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
		</div>
	);
}

export default App;
