import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refreshToken = async () => {
        const response = await axios.get('http://localhost:8000/user/refreshToken', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refreshToken;
};

export default useRefreshToken;