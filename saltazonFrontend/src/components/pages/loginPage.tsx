import React, { useState } from 'react';
import LoginForm from '../Login/loginform';
import NewUserForm from '../Login/newuserform';

const Button = ({ btnText, moveForm }) => <button onClick={moveForm} className='w-40 h-16 border border-black bg-orange-300 hover:border-white'>{btnText}</button>;

const LoginPage = () => {
  const [btnState, setBtnState] = useState(false);

  return (
    <main className="bg-gradient-to-r from-[rgb(250,230,200)] to-[rgb(245,215,175)]  w-screen min-h-[45rem] ">
      <section className='text-center relative mx-auto top-14 w-2/4 h-96 flex'>
        <div className=' w-2/4'>
          <h2 className='text-xl pt-24'>Have an account?</h2>
          <h3 className='text-lg pb-12'>Log-In for the best shopping experience</h3>
          <Button moveForm={() => setBtnState(!btnState)} btnText={'Log In'}/>
        </div>
        <div className=' w-2/4'>
          <h2 className='text-xl pt-24'>New to Saltazon?</h2>
          <h3 className='text-lg pb-12'>Create your Saltazon account!</h3>
          <Button moveForm={() => setBtnState(!btnState)} btnText={'Sign Up'}/>
        </div>
        <div className={`absolute h-full w-1/2 bg-gray-100 border border-black rounded-lg p-5 ${btnState ? 'right-0 transition-all duration-1000 ease-in-out' : 'right-[50%] transition-all duration-1000 ease-in-out'}`}>
          { btnState ? <NewUserForm /> : <LoginForm /> }
        </div>
      </section>
      <div className='text-center mt-20'>
        <p>
          Feel free to use example users (credentials below) or sign up and test the application!
        </p>
      </div>
      <section className='flex text-center mt-10'>
        <div className='w-1/3'>
          <p>cjurczyk6@theatlantic.com</p>
          <p>xxnBq4wz</p>
          <p>admin: id 7</p>
          <p>storeId: 2</p>
        </div>
        <div className='w-1/3'>
          <p>dsubhan2h@shop-pro.jp</p>
          <p>xaqQgPRBm</p>
          <p>user: id 90</p>
        </div>
        <div className='w-1/3'>
          <p>bdixcey2g@163.com</p>
          <p>2sUy6HeUCZt</p>
          <p>admin: id 89</p>
          <p>storeId: 1</p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage;
