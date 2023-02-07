import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.send('Users!');
})

router.post('/login', async (req: Request, res: Response) => {
  console.log('Login Page')
  // const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  // console.log(encryptedPassword)
  res.send('LOGIN ENDPOINT');
})

export default router;
