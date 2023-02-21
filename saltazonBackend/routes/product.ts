import express, { Request } from 'express';
import { Response } from 'express-serve-static-core';
import paginate from '../middlewares/paginate';
import authenticateToken from '../middlewares/authenticateToken';
const router = express.Router();

router.get('/', authenticateToken, paginate, async (req: Request, res: Response) => {
  return res.status(200).json(res.respondWithData);
})

router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const product = await (await fetch(`http://localhost:8000/api/product/${req.params.id}`)).json();
    if (product) {
      return res.status(200).json(product.data)
    }
  } catch(error) {
    return res.status(500).send()
  }
})

export default router;
