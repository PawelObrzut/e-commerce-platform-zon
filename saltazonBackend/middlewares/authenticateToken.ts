import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
const refreshKey = process.env.REFRESH_TOKEN_SECRET;

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!refreshKey) {
    return res.sendStatus(500);
  }
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const reqToken = authHeader.split(' ')[1];
  jwt.verify(reqToken, refreshKey, error => {
    if (error) {
      return res.sendStatus(403);
    }
    return next();
  });
  return (Error);
};

export default authenticateToken;
