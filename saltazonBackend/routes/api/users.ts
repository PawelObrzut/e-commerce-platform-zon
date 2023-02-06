import express, { Express, Request, Response } from 'express';
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.send('Users!');
})

router.post('/', async (req: Request, res: Response) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(encryptedPassword)
  res.send('Create User');
})

export default router;
