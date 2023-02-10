import './App.css';
import { useState } from 'react';

import {
    Routes,
    Route
} from 'react-router-dom';

import {fakeProducts} from './fakedata/Fakedata.js';
import {fakecart} from './fakedata/fakecart.js';
import NavBar from './components/Navbar.jsx';
import Cart from './components/checkout/Cart.jsx';
import AdminPage from "./admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from './components/Products/ProductList.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import NewUserForm from './components/login/NewUserForm.jsx';
import SuperAdminPage from "./admin/SuperAdminPage.jsx";

import { RequireAuth, useSignIn } from 'react-auth-kit';

function addToCart(productId) {
    console.log("Add " + productId + " From the App")
    //add item to the current Cart
}

function removeFromCart(productId) {
    console.log("Remove " + productId + " From the App")
    //remove item from the current Cart
}

function getCurrentCart() {
    return fakecart;
    //update to get from localstorage
}


function App() {
    const [currentCart, setCurrentCart] = useState(getCurrentCart());

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [role, setRole] = useState('user');
    
    const signIn = useSignIn();

    const handleLogIn = async (event) => {
        event.preventDefault();

        const credentials = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
              })
            }).then(respond => respond.json())
              .then(credentials => credentials)
              .catch(error => console.log(error));

          signIn({
              token: credentials.accessToken,
              expiresIn: 1,
              tokenType: "Bearer",
              authState: ({ email: credentials.email })
          })
        event.target.reset();
    }

    const handleSignUp = async (event) => {
      event.preventDefault();
      await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            role: role,
            storeId: null
        })
        })
        .then(respond => respond.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
      event.target.reset();
    }

    return (
        <div className="App">
        
            <header className={"top_header"}>
                <ProfileBar/>
                <NavBar/>
            </header>
            <Routes>
                <Route exact path='/create-new-user' 
                  element={
                    <NewUserForm 
                      onSubmit={handleSignUp}
                      setEmail={setEmail}
                      setPassword={setPassword}
                      setRole={setRole}
                    />
                  }
                ></Route>

                <Route exact path='/login'
                  element={
                    <LoginForm
                      onSubmit={handleLogIn}
                      setEmail={setEmail}
                      setPassword={setPassword}
                    />
                  }
                ></Route>

                <Route exact path='/'
                  element={
                    <RequireAuth loginPath={'/login'}>
                      <ProductList 
                        products={fakeProducts}
                        addToCart={addToCart}
                      />
                    </RequireAuth>
                  }
                ></Route>

                <Route exact path='/cart'
                  element={
                    <Cart 
                      products={currentCart} 
                      removeFromCart={removeFromCart}
                    />
                  }
                ></Route>

                <Route exact path='/admin' element={< AdminPage/>}></Route>
                <Route exact path='/admin/super' element={< SuperAdminPage/>}></Route>
            </Routes>
            
        </div>
    )
}

export default App;
