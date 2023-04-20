import { Request, NextFunction } from 'express';
import { Response } from 'express-serve-static-core';
import { ProductInterface } from '../types/types';

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = res.data;
    const searchQuery = req.query.searchQuery as string | undefined;
    
    if (searchQuery && products) {
      res.data = products.filter((product: ProductInterface) => product.title.includes(searchQuery));
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default search;
