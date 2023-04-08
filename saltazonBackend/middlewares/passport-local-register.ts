import * as PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../utils/utils';
import baseURL from '../api';

passport.use(
  'register',
  new PassportLocal.Strategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (user) {
          return done(null, false);
        }

        await fetch(
          `${baseURL}/api/user/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password: bcrypt.hashSync(password, 10),
              role: req.body.role,
              storeId: req.body.storeId || null,
            }),
          },
        )
          .then(response => response.json())
          .then(data => data);

        done(null, true);
      } catch (error) {
        done(error);
      }
      return (Error);
    },
  ),
);
