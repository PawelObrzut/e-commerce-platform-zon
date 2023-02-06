import express, { Express, Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
 const authenticated = true;
  if (!authenticated) {
    return res.redirect('/api/user')
  }

  res.send('Product Collection');
})

export default router;
