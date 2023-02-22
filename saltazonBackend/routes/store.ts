import express, { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { ProductInterface } from '../types/types';
import authenticateToken from '../middlewares/authenticateToken';
const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  return res.status(200).json({message: "don't try, do!"});
})

router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const storeResponse = await fetch(`http://localhost:8000/api/store/${req.params.id}`);
    const storeData = await storeResponse.json();

    const productResponse = await fetch('http://localhost:8000/api/product');
    const productData = await productResponse.json();

    const filteredProducts = productData.data.filter((product: ProductInterface) => product.storeId === parseInt(req.params.id));

    if (storeData && filteredProducts) {
      return res.status(200).json({
        store: storeData.data.name,
        products: filteredProducts,
      });
    }
  } catch(error) {
    return res.status(500).send();
  }
});

export default router;
