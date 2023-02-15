import './LogInSignUp.css';
import { useState } from 'react';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';

const LogInSignUp = () => {
  const [btnState, setBtnState] = useState(false);
  const handleClickButton = () => setBtnState(btnState => !btnState);

  const logInVisibility = btnState ? 'visibility' : null;
  const signUpVisibility = btnState ? null : 'visibility';
  const moving = btnState ? 'moving' : null;

  return (
    <section className="logInSignUp">
      <div className="container">
        <div className="backbox">
          <div className={`loginMsg ${logInVisibility}`}>
            <div className="textcontent">
              <p className="title">Don't have an account?</p>
              <p>Sign up to browse through saltazon</p>
              <button onClick={handleClickButton} id="switch1" className="btn">Sign up</button>
            </div>
          </div>
          <div className={`signupMsg ${signUpVisibility}`}>
            <div className="textcontent">
              <p className="title">Have an account?</p>
              <p>Log in to see all our collections.</p>
              <button onClick={handleClickButton} id="switch1" className="btn">Log in</button>
            </div>
          </div>
        </div>

        <div className={`frontbox ${moving}`}>
          {btnState ? (
            <SignUp />
          ) : (
            <LogIn />
          )}
        </div>
      </div>
    </section>
  );
};

export default LogInSignUp;