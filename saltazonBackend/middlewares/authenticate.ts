import express, { NextFunction } from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt';

// passport.use(new LocalStrategy({usernameField: 'email'}))
interface InterfaceUser {
  "id": number
  "email": string,
  "password": string,
  "role": string,
  "storeId": boolean
}

const getUserByEmail = async (email: string): Promise<InterfaceUser | undefined> => {
  // ?? due to async nature should it be wrapped in try catch block ?
  const usersCollection = await fetch(`http://localhost:8000/api/user/`, {method: 'GET'}).then(response => response.json());
  return usersCollection.data.find(user => user.email === email);
}

passport.use(new LocalStrategy(async (user, password, cb) => {
  if (!user) {
    return cb(null, false, { message: 'User not found'})
  }

  try {
    if (await bcrypt.compare(password, user.password)){
      return cb(null, user)
    }
    return cb(null, false, { message: 'Password is incorrect'})
  } catch (error) {
    return cb(error)
  }
}))

const authentucate = (req: Request, res: Response, next: NextFunction) => {

}
