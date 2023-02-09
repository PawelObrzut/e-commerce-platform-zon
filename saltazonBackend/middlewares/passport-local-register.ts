import * as PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../utils/helperFunctions';

passport.use(
  'register',
  new PassportLocal.Strategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    }, 
    async (req, email, password, done) => {
      console.log(req.body)
      try {
        const user = await findUserByEmail(email);
        if (user) {
          console.log("user exists!")
          return done(null, false);
        }

        await fetch('http://localhost:8000/api/user/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: email,
            password: await bcrypt.hash(password, 10),
            role: req.body.role,
            storeId: req.body.storeId || null
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
