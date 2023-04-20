import express, { Request } from 'express';
import { Response } from 'express-serve-static-core';
import passport from 'passport';
import axios from 'axios';
import paginate from '../middlewares/paginate';
import filter from '../middlewares/filter';
import search from '../middlewares/search';
import baseURL from '../api';

const router = express.Router();

router.get('/', passport.authenticate('authenticateJWT'), filter, search, paginate, async (req: Request, res: Response) => res.status(200).json(res.respondWithData));

router.get('/:id', passport.authenticate('authenticateJWT'), async (req: Request, res: Response) => {
  try {
    const product = await axios.get(`${baseURL}/api/product/${req.params.id}`).then(response => response.data);
    if (product) {
      return res.status(200).json({ responseData: product.data });
    }
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(500).send();
});

router.delete('/:id', passport.authenticate('authenticateJWT'), async (req: Request, res: Response) => {
  try {
    await axios.delete(`${baseURL}/api/product/${req.params.id}`);
    console.log('Product deleted');
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send();
  }
});

export default router;
