import express, { Request } from 'express';
import { Response } from 'express-serve-static-core';
import paginate from '../middlewares/paginate';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.get('/', authenticateToken, paginate, async (req: Request, res: Response) => res.status(200).json(res.respondWithData));

router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const product = await (await fetch(`http://localhost:8000/api/product/${req.params.id}`)).json();
    if (product) {
      return res.status(200).json({ responseData: product.data });
    }
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(500).send();
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    fetch(`http://localhost:8000/api/product/${req.params.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
