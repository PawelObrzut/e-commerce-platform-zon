import { Router, Request, Response } from 'express';
import { RequestUser } from '../types/types';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticateToken from '../middlewares/authenticateToken';
const router = Router();
dotenv.config();

const privateKey = process.env.ACCESS_TOKEN_SECRET;

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const usersCollection = await fetch(`http://localhost:8000/api/user/`, {method: 'GET'}).then(response => response.json());
  return res.send(usersCollection);
})

router.post('/login', passport.authenticate('login'), async (req: RequestUser, res: Response) => {
  if (!req.user) {
    return res.send({ message: "Did you forget password?"})
  }
  if (!privateKey) {
    return res.send('internal server error')
  }
  const token = jwt.sign(
    { userid: req.user.id, mail: req.user.email},
    privateKey
    // { expiresIn: '1d' } // ! I do not know yet how to refresh the token
  )
  console.log('TOKEN', token)
  res.json({ accessToken: token });
})

router.post('/register', passport.authenticate('signup'), async (req: Request, res: Response) => {

  res.send('Register');
})

export default router;
