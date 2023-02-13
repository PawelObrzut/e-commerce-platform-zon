import express, { Express, Request, Response } from 'express';
import authenticateToken from '../middlewares/authenticateToken';
const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  const productsCollection = await fetch(`http://localhost:8000/api/product/`, {method: 'GET'}).then(response => response.json());
  return res.send(productsCollection.data);
})

export default router;
