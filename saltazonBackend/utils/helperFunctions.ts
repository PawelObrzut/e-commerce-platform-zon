import { InterfaceUser } from '../types/types';

export const findUserByEmail = async (email: string): Promise<InterfaceUser | undefined> => {
  const usersCollection = await fetch('http://localhost:8000/api/user/', {method: 'GET'}).then(response => response.json());
  return usersCollection.data.find((user: InterfaceUser) => user.email === email);
}

exports.modules = findUserByEmail;
