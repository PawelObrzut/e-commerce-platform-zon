import * as PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { InterfaceUser } from '../types/types';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: InterfaceUser, done) => done(null, user));
 
passport.use(
  'signup',
  new PassportLocal.Strategy(
    {
      usernameField: 'email'
    }, 
    async (email, password, done) => {
      console.log('PASS SIGNUP::', email, password);

      try {
        const user = await fetch('http://localhost:8000/api/user/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: email,
            password: await bcrypt.hash(password, 10)
          })
        })
          .then(response => response.json())
          .then(data => data);
        console.log('PASSPORT SIGNUP: DB RESPONSE:', user);

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
);
