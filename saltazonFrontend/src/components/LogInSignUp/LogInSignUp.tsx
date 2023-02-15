import './LogInSignUp.css';
import { useState } from 'react';
import LogIn from './subComponents/LogIn/LogIn';
import SignUp from './subComponents/SignUp/SignUp';
import BackboxContent from './subComponents/BackboxContent/BackboxContent';

const LogInSignUp = () => {
  const [btnState, setBtnState] = useState(false);
  const handleClickButton = () => setBtnState(btnState => !btnState);

  const moving = btnState ? 'moving' : null;

  return (
    <section className="logInSignUp">
      <div className="container">
        <div className="backbox">
          <BackboxContent
            handleClickButton={handleClickButton}
            title="Don't have an account?"
            paragraphText="Sign up to browse through saltazon"
            buttonText="Sign up"
          />
          <BackboxContent
            handleClickButton={handleClickButton}
            title="Don't have an account?"
            paragraphText="Sign up to browse through saltazon"
            buttonText="Sign up"
          />
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