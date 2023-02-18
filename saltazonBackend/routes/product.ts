import express, { Request, Response } from 'express';
import paginate from '../middlewares/paginate';
import authenticateToken from '../middlewares/authenticateToken';
const router = express.Router();

router.get('/', authenticateToken, paginate, async (req: Request, res: Response) => {
  console.log(res.respondWithData);
  return res.status(200).json(res.respondWithData);
})

export default router;
