import { Router, Request, Response } from 'express';
import { RequestUser } from '../types/types';
import { generateJWT } from '../utils/utils';
import passport from 'passport';
import authenticateToken from '../middlewares/authenticateToken';
const router = Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const usersCollection = await fetch(`http://localhost:8000/api/user/`, {method: 'GET'}).then(response => response.json());
  return res.send(usersCollection);
})

router.post('/login', passport.authenticate('login'), async (req: RequestUser, res: Response) => {
  const token = generateJWT(req);

  return res.json({ 
    accessToken: token,
    email: req.user?.email
  });
})

router.post('/register', passport.authenticate('register'), async (req: Request, res: Response) => {
  console.log('User or Admin has been created')
  return res.status(203).json({ message: 'User Registered'});
})

export default router;
