import * as PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { InterfaceUser } from '../types/types';
import { findUserByEmail } from '../utils/utils';

passport.serializeUser((user: any, done) => {
  // eslint-disable-next-line no-param-reassign
  delete user.password;
  return done(null, user);
});
passport.deserializeUser((user: InterfaceUser, done) => done(null, user));

passport.use(
  'login',
  new PassportLocal.Strategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (!user) {
          return done(null, false);
        }
        try {
          if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error);
        }
      } catch (error) {
        done(error);
      }
      return (Error);
    },
  ),
);
