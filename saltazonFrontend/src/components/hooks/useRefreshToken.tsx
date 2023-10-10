import axios from 'axios';
import useAuth from './useAuth';
import { baseURL } from '../utils/api';
import { UserInterface } from '../../types';

const useRefreshToken = () => {
	const { setUser, setRefreshClass } = useAuth();

	const refreshToken = async () => {
		const response = await axios.post(`${baseURL}/user/refreshToken`, null, {
			withCredentials: true
		});
		setUser((prev: UserInterface) => {
			return { ...prev, accessToken: response.data.accessToken }
		});
		setRefreshClass(false);
		return response.data.accessToken;
	}
	return refreshToken;
};

export default useRefreshToken;