import * as PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { InterfaceUser } from '../types/types';
import { findUserByEmail } from '../utils/helperFunctions';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: InterfaceUser, done) => done(null, user));
 
passport.use(
  'register',
  new PassportLocal.Strategy(
    {
      usernameField: 'email'
    }, 
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (user) {
          console.log('user exists!')
          return done(null, false);
        }

        const registerUser = await fetch('http://localhost:8000/api/user/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: email,
            password: await bcrypt.hash(password, 10),
            role: 'user',
            storeId: null
          })
        })
          .then(response => response.json())
          .then(data => data);

        done(null, true)
      } catch (error) {
        done(error)
      }
    }
  )
);
