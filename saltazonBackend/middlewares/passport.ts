const JwtStrategy = require('passport-jwt').Strategy;
import bcrypt from 'bcrypt';

interface InterfaceUser {
  "id": number
  "email": string,
  "password": string,
  "role": string,
  "storeId": boolean
}

const getUserByEmail = async (email: string): Promise<InterfaceUser | undefined> => {
  const usersCollection = await fetch(`http://localhost:8000/api/user/`, {method: 'GET'}).then(response => response.json());
  return usersCollection.data.find((user: InterfaceUser) => user.email === email);
}

const createPassport = (passport:any) => {
  const verifyCallback = async (user:InterfaceUser, password: string, cb: any) => {
    if (!user) {
      return cb(null, false, { message: 'User not found'})
    }
    try {
      if (await bcrypt.compare(password, user.password)){
        return cb(null, user)
      }
      return cb(null, false, { message: 'Password is incorrect' })
    } catch (error) {
      return cb(error)
    }
  }
  passport.use(new JwtStrategy(verifyCallback))
  passport.serializeUser();
  passport.deserializeUser();
}

export default createPassport;