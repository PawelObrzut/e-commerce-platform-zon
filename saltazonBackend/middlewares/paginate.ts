import { Request, Response, NextFunction } from "express";
import { PaginatedData } from '../types/types';

interface ResponseWithData extends Response {
  respondWithData?: PaginatedData
}

const paginate = async (req: Request, res: ResponseWithData, next: NextFunction) => {
  try {
    const { page = '1', limit = '10' } = req.query;
    const startIndex = (+page - 1) * +limit;
    const endIndex = +page * +limit;

    const productsCollection = await fetch(`http://localhost:8000/api/product/`, {method: 'GET'}).then(response => response.json());
    const count = productsCollection.data.length;

    const paginatedData: PaginatedData = {
      limit: +limit,
      page: +page,
      count: count,
      responseData: productsCollection.data.slice(startIndex, endIndex)
    }

    if (startIndex > 0) {
      paginatedData.previous = +page - 1;
    }
    if (endIndex < count) {
      paginatedData.next = +page + 1;
    }

    res.respondWithData = paginatedData;
    next();

  } catch (error) {
    next(error);
  }
}

export default paginate;
