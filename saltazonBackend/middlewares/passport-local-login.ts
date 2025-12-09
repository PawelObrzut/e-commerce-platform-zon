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

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false);
        }
        const { password: _, ...userSafe } = user;
        return done(null, userSafe);
      } catch (error) {
        console.error('Passport login error:', error);
        return done(error);
      }
    }
  )
);
