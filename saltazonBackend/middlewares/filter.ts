import axios from 'axios';
import { Request, NextFunction } from 'express';
import { Response } from 'express-serve-static-core';
import baseURL from '../api';
import { ProductInterface } from '../types/types';

const filter = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(`${baseURL}/api/product/`);
    const products = response.data.data;
    const category = req.query.category as string | undefined;
    const searchQuery = req.query.searchQuery as string | undefined;
    
    let filtered = [] as ProductInterface[];

    if (category) {
      filtered = products.filter( (product: ProductInterface) => product.category === category)
      res.data = filtered;
    } else {
      res.data = products;
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default filter;
