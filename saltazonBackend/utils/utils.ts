import axios from 'axios';
import { InterfaceUser } from '../types/types';
import baseURL from '../api';

export const findUserByEmail = async (email: string): Promise<InterfaceUser | undefined> => {
  const response = await axios.get(`${baseURL}/api/user/`);
  const usersCollection = response.data;
  return usersCollection.data.find((user: InterfaceUser) => user.email === email);
};

exports.modules = {
  findUserByEmail,
};
