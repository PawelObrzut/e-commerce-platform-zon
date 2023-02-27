import express, { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { ProductInterface } from '../types/types';
import authenticateToken from '../middlewares/authenticateToken';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => res.status(200).json({ message: "don't try, do!" }));

router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const storeResponse = await fetch(`http://localhost:8000/api/store/${req.params.id}`);
    const storeData = await storeResponse.json();

    const productResponse = await fetch('http://localhost:8000/api/product');
    const productData = await productResponse.json();

    const filteredProducts = productData
      .data.filter((product: ProductInterface) => product.storeId === parseInt(req.params.id, 10));

    if (storeData && filteredProducts) {
      return res.status(200).json({
        store: storeData.data.name,
        products: filteredProducts,
      });
    }
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(500).send();
});

router.post('/:id/product', authenticateToken, async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    fetch('http://localhost:8000/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        storeId: req.body.storeId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return res.status(201).json({ message: 'new has been product created' });
      });
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(500).send();
});

export default router;
