import { InterfaceUser } from '../types/types';
import baseURL from '../api';

export const findUserByEmail = async (email: string): Promise<InterfaceUser | undefined> => {
  const usersCollection = await fetch(`${baseURL}/api/user/`, { method: 'GET' }).then(response => response.json());
  return usersCollection.data.find((user: InterfaceUser) => user.email === email);
};

exports.modules = {
  findUserByEmail,
};
