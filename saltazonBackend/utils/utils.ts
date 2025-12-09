import axios from 'axios';
import { InterfaceUser } from '../types/types';
import baseURL from '../api';

export const findUserByEmail = async (
  email: string
): Promise<InterfaceUser | undefined> => {
  try {
    const url = `${baseURL}api/user`; 
    const response = await axios.get(url);

    if (!response.data || !response.data.data) {
      console.error('Unexpected response format from API:', response.data);
      return undefined;
    }

    return response.data.data.find((user: InterfaceUser) => user.email === email);
    
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return undefined;
  }
};
