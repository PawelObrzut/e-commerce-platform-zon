import { Request } from 'express';

export interface InterfaceUser {
  id: number,
  email: string,
  password: string,
  role: string,
  storeId: boolean
}

export interface RequestUser extends Request {
  user?: {
    id?: number,
    email?: string,
    password?: string,
    role?: string,
    storeId?: number | null
  }
}

export interface ProductInterface {
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  storeId: number,
  price: string,
  quantity: number,
  category: string
}

export interface PaginatedData {
  limit?: number,
  page?: number,
  next?: number,
  previous?: number,
  count?: number,
  responseData?: ProductInterface[]
}

export interface ResponseWithData extends Response {
  respondWithData?: PaginatedData
}
