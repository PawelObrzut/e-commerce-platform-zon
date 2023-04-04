import {
  Router, Request, Response, response,
} from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { RequestUser } from '../types/types';

dotenv.config();
const router = Router();

const refreshKey = process.env.REFRESH_TOKEN_SECRET;
const accessKey = process.env.ACCESS_TOKEN_SECRET;

router.get('/', passport.authenticate('authenticateJWT'), async (req: Request, res: Response) => {
  const usersCollection = await fetch('http://127.0.0.1:8000/api/user/', { method: 'GET' })
    .then(response => response.json())
    .catch(error =>  console.log(error));
  return res.send(usersCollection);
});

router.post('/login', passport.authenticate('login'), async (req: RequestUser, res: Response) => {
  if (!accessKey || !refreshKey || !req.user) {
    return res.status(500).json({ message: 'Internal server error'})
  }
  const { id: userId } = req.user

  const accessToken = jwt.sign({ ...req.user, iat: Math.floor(Date.now() / 1000) }, accessKey, { expiresIn: '5m' });
  const refreshToken = jwt.sign({ ...req.user, iat: Math.floor(Date.now() / 1000) }, refreshKey);

  const body = new Map();
  body.set('id', userId);
  body.set('token', refreshToken);

  fetch('http://127.0.0.1:8000/api/user/saveRefreshToken', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(Object.fromEntries(body))
    }
  )
    .then(response => response.text())
    .then(message => {
      console.log(message);
      return res
        .status(203)
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
        })
        .json({ 
          accessToken: accessToken
        });
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ message: 'Internat server error, could not save the refresh token.' })
    })
});

router.post('/refreshToken', (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  if (!refreshKey || !accessKey) {
    return res.status(500).json({ message: 'Internal server error'})
  }

  fetch(`http://127.0.0.1:8000/api/user/token/${refreshToken}`, { method: 'GET' })
    .then(response => response.json())
    .then((message: boolean) => {
      if (message) {
        jwt.verify(refreshToken, refreshKey, (err: any, decode: any) => {
          if (err) {
            return res.sendStatus(403);
          }
          const { iat, exp, ...userData } = decode;
          const accessToken = jwt.sign(userData, accessKey, { expiresIn: '5m' });
          return res
            .status(203)
            .json({ accessToken: accessToken });
        });
      } else {
        return res.status(403).json({ message: 'Refresh token revoked' })
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ message: 'Internat server error, could not refresh the token.' })
    });
});

router.post('/register', passport.authenticate('register'), async (req: Request, res: Response) => res.status(203).json({ message: 'User Registered' }));

router.delete('/logout', async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.status(204).json({ message: 'No cookie-token to delete' })
  }
  const refreshToken = cookies.refreshToken

  fetch(`http://127.0.0.1:8000/api/user/token/${refreshToken}`, { method: 'DELETE' })
    .then(response => response.text())
    .then(message => {
      console.log(message)
      return res
        .clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
        })
        .sendStatus(204)
    })
    .catch(error => {
      console.log(error)
      return res
        .status(500)
        .clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
        })
        .json({ message: 'cookie deleted' })
    });
});

export default router;
