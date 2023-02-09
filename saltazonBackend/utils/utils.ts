import { InterfaceUser, RequestUser } from '../types/types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const privateKey = process.env.ACCESS_TOKEN_SECRET;
const refreshKey = process.env.REFRESH_TOKEN_SECRET;

export const findUserByEmail = async (email: string): Promise<InterfaceUser | undefined> => {
  const usersCollection = await fetch('http://localhost:8000/api/user/', {method: 'GET'}).then(response => response.json());
  return usersCollection.data.find((user: InterfaceUser) => user.email === email);
}

export const generateAccessJWT = (req: RequestUser) => {
  if (!req.user) {
    return 'Error, unable to issue a valid token';
  }
  if (!privateKey) {
    return 'Error, unable to issue a valid token';
  }
  return jwt.sign(
    { userid: req.user.id, mail: req.user.email },
    privateKey,
    { expiresIn: '15m' } 
  )
}

export const genereteRefreshJWT = (req: RequestUser) => {
  if (!req.user) {
    return 'Error, unable to issue a valid token';
  }
  if (!refreshKey) {
    return 'Error, unable to issue a valid token';
  }
  return jwt.sign(req.user, refreshKey )
}

exports.modules = {
  findUserByEmail,
  generateAccessJWT,
  genereteRefreshJWT
};
