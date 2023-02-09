import { Router, Request, Response, NextFunction } from 'express';
import { RequestUser } from '../types/types';
import { generateAccessJWT, genereteRefreshJWT } from '../utils/utils';
import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middlewares/authenticateToken';
const router = Router();

const refreshTokens: string[] = [];
const refreshKey = process.env.REFRESH_TOKEN_SECRET;

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const usersCollection = await fetch(`http://localhost:8000/api/user/`, {method: 'GET'}).then(response => response.json());
  return res.send(usersCollection);
})

router.post('/login', passport.authenticate('login'), async (req: RequestUser, res: Response) => {
  const accessToken = generateAccessJWT(req.user as RequestUser);
  const refreshToken = genereteRefreshJWT(req.user as RequestUser);
  refreshTokens.push(refreshToken);

  return res.json({ 
    accessToken: accessToken,
    refreshToken: refreshToken,
    email: req.user?.email
  });
})

router.post('/refreshToken', (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized'})
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Forbidden'})
  }
  if (!refreshKey) {
    return res.status(500).json({ message: 'Cannot refresh Token' })
  }
  jwt.verify(refreshToken, refreshKey, (error: any, user: any ) => {
    if (error) {
      return res.sendStatus(403)
    }
    const accessToken = generateAccessJWT(user)
    return res.json({ accessToken: accessToken});
  })
})

router.post('/register', passport.authenticate('register'), async (req: Request, res: Response) => {
  console.log('User or Admin has been created')
  return res.status(203).json({ message: 'User Registered'});
})

export default router;
