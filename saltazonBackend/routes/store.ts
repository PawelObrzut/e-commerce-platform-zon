import express, { Request } from 'express';
import { Response } from 'express-serve-static-core';
import passport from 'passport';
import { ProductInterface } from '../types/types';
import axios from 'axios';
import baseURL from '../api';

const router = express.Router();

router.get('/', passport.authenticate('authenticateJWT'), async (req: Request, res: Response) => res.status(200).json({ message: "don't try, do!" }));

router.get('/:id', passport.authenticate('authenticateJWT'), async (req: Request, res: Response) => {
  try {
    const storeResponse = await axios.get(`${baseURL}/api/store/${req.params.id}`);
    const storeData = storeResponse.data;

    const productResponse = await axios.get(`${baseURL}/api/product`);
    const productData = productResponse.data;

    const filteredProducts = productData
      .data.filter((product: ProductInterface) => product.storeId === parseInt(req.params.id, 10));

    if (storeData && filteredProducts) {
      return res.status(200).json({
        uniqueStoreId: req.params.id,
        storeName: storeData.data.name,
        products: filteredProducts,
      });
    }
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(500).send();
});

router.post('/:id/product', passport.authenticate('authenticateJWT'), async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    axios.post(`${baseURL}/api/product`, {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      storeId: req.body.storeId,
    })
      .then(response => {
        console.log(response.data);
        return res.status(201).json({ message: 'new has been product created' });
      });
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(500).send();
});

export default router;
