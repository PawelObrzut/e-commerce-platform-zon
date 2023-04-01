import { useEffect, useState } from 'react';
import axios from 'axios';
import useRefreshToken from "./useRefreshToken";
import useAuth from './useAuth';

interface FetchData<T> {
  data?: T;
  isLoading: boolean;
  error: string | null;
}

const useFetch = <T = unknown>(url: string): FetchData<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    const axiosInstance: any = axios.create({
      baseURL: url,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
        (config: any) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        }, (error: any) => Promise.reject(error)
      );

    axiosInstance.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = useRefreshToken();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(prevRequest);
            }
            return Promise.reject(error);
        }
    );

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url, {
          signal: controller.signal
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log('fetch error', error)
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();

  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;