import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { RequestUser } from '../types/types';
import baseURL from '../api';

dotenv.config();
const router = Router();

const refreshKey = process.env.REFRESH_TOKEN_SECRET;
const accessKey = process.env.ACCESS_TOKEN_SECRET;
const expireTime = '5m';

router.get('/', passport.authenticate('authenticateJWT'), async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${baseURL}/api/user/`);
    const usersCollection = response.data;
    return res.send(usersCollection);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', passport.authenticate('login'), async (req: RequestUser, res: Response) => {
  if (!accessKey || !refreshKey || !req.user) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  const { id: userId } = req.user;

  const accessToken = jwt.sign({ ...req.user, iat: Math.floor(Date.now() / 1000) }, accessKey, { expiresIn: expireTime });
  const refreshToken = jwt.sign({ ...req.user, iat: Math.floor(Date.now() / 1000) }, refreshKey);

  const body = {
    id: userId,
    token: refreshToken,
  };

  try {
    await axios.post(`${baseURL}/api/user/saveRefreshToken`, body, { headers: { 'Content-Type': 'application/json' } });
    return res
      .status(203)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({
        accessToken
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.post('/refreshToken', (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  if (!refreshKey || !accessKey) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  axios
    .get(`${baseURL}/api/user/token/${refreshToken}`)
    .then((response) => {
      const message = response.data;
      if (message) {
        jwt.verify(refreshToken, refreshKey, (err: any, decode: any) => {
          if (err) {
            return res.sendStatus(403);
          }
          const { iat, exp, ...userData } = decode;
          const accessToken = jwt.sign(userData, accessKey, { expiresIn: expireTime });
          return res.status(203).json({ accessToken: accessToken });
        });
      } else {
        return res.status(403).json({ message: 'Refresh token revoked' });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error, could not refresh the token.' });
    });
});

router.post('/register', passport.authenticate('register'), async (req: Request, res: Response) => res.status(203).json({ message: 'User Registered' }));

router.delete('/logout', async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.status(204).json({ message: 'No cookie-token to delete' })
  }
  const refreshToken = cookies.refreshToken

  try {
    const response = await axios.delete(`${baseURL}/api/user/token/${refreshToken}`);
    // console.log(response.data)
    return res
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      })
      .sendStatus(204);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      })
      .json({ message: 'cookie deleted' });
  }
});

export default router;
