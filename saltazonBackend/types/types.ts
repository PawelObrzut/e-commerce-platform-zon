import {Request} from 'express';

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
    password?: string
  }
}