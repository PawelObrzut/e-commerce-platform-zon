import * as PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { InterfaceUser } from '../types/types';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: InterfaceUser, done) => done(null, user));
 
passport.use(new PassportLocal.Strategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    console.log('in the passport strategy before searching for a user');
    const usersCollection = await fetch(`http://localhost:8000/api/user/`, {method: 'GET'}).then(response => response.json());
    const user = usersCollection.data.find((user: InterfaceUser) => user.email === email);
    
      if (!user) {
        console.log('USER IST NICHT DA');
        return done(null, false, { message: 'User not found!'});
      }
      try {
        if (user.password === password || await bcrypt.compare(password, user.password)){
          console.log('PASSWORD CORRECT');
          return done(null, user)
        }
          console.log('PASSWORD INCORRECT');
        return done(null, false, { message: 'Password is incorrect' });
      } catch (error) {
        return done(error);
      }
  } catch (error) {
    done(error);
  }
}));
