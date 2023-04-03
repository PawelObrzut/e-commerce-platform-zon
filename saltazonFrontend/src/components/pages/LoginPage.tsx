import React, { useState } from 'react'
import LoginForm from '../Login/LoginForm';
import NewUserForm from '../Login/NewUserForm';

const Button = ({btnText, moveForm}) => <button onClick={moveForm} className='w-40 h-16 border border-black bg-orange-300 hover:border-white'>{btnText}</button>;

const LoginPage = () => {
  const [btnState, setBtnState] = useState(false);
  
  return (
    <main className="bg-[url('./images/b_loginPage.png')] bg-contain bg-top bg-no-repeat w-screen min-h-screen ">
      <section className='text-center relative left-[12%] top-14 w-2/4 h-96 flex'>
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
        <div className={`absolute h-full w-1/2 bg-orange-200 rounded-lg p-5 ${btnState ? 'right-0 transition-all duration-1000 ease-in-out' : 'right-[50%] transition-all duration-1000 ease-in-out'}`}>
          { btnState ? <NewUserForm /> : <LoginForm /> }
        </div>
      </section>
      <div className='absolute bottom-5 left-[40%]'>
        <p>agommesc@hp.com</p>
        <p>ok4Qx45</p>
      </div>
    </main>
  )
}

export default LoginPage