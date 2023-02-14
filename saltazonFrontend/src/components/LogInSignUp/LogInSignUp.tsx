import './LogInSignUp.css';
import { useState } from 'react';

const LogInSignUp = () => {
  const [btnState, setBtnState] = useState(false);

  const handleClickButton = () => {
    setBtnState(btnState => !btnState);
  }

  const logInVisibility = btnState ? 'visibility' : null;
  const signUpVisibility = btnState ? null : 'visibility';
  const moving = btnState ? 'moving' : null;
  const logInHide = btnState ? 'hide' : null;
  const signUpHide = btnState ? null : 'hide';
  
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
          <div className={`login ${logInHide}`}>
            <h2>LOG IN</h2>
            <form>
              <input placeholder={"email"} />
              <input type="password" placeholder={"password"} />
              <input className="submit--form" type={"submit"} value="LogIn" />
            </form>
          </div>

          <div className={`signup ${signUpHide}`}>
            <h2>SIGN UP</h2>
              <form>
                <input placeholder={"email"} />
                <input placeholder={"password"} />
                <input placeholder={"confirm password"} />
                <select className="form--select" placeholder={"user"} >
                  <option value={"user"}>User</option>
                  <option value={"admin"}>Admin</option>
                </select>
                <br/>
                <br/>
                <input className="submit--form" type={"submit"} value="Sign Up"/>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogInSignUp