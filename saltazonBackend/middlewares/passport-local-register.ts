import * as PassportLocal from 'passport-local';
import axios from 'axios';
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

        await axios.post(
          `${baseURL}/api/user/`,
          {
            email,
            password: bcrypt.hashSync(password, 10),
            role: req.body.role,
            storeName: req.body.storeName,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        done(null, true);
      } catch (error) {
        done(error);
      }
      return (Error);
    },
  ),
);
