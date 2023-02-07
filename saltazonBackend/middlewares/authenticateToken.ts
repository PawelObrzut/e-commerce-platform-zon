import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
dotenv.config();
const privateKey = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!privateKey) {
    return res.sendStatus(500)
  }
  if (!authHeader) {
    return res.sendStatus(401)
  }
  
  const reqToken = authHeader.split(' ')[1]
  console.log('REQUEST TOKEN IS::', reqToken);

  jwt.verify(reqToken, privateKey, (error, decoded) => {
    if (error) {
      return res.sendStatus(403)
    }
    console.log('WHAT THE HECK IS DECODED::', decoded);
    next();
  })
}

export default authenticateToken;
