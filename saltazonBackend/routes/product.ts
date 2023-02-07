import express, { Express, Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const productsCollection = await fetch(`http://localhost:8000/api/product/`, {method: 'GET'}).then(response => response.json());
  return res.send(productsCollection);
})

export default router;
