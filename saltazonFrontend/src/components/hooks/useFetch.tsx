import { useEffect, useState } from 'react';
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
  const { user, setRefreshClass } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user?.accessToken
          }
        });

        if (response.status === 401) {
          setRefreshClass(true)
        }
        const json = await response.json();
        json && setData(json)
        setIsLoading(false);
        setRefreshClass(false)
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    if (user.accessToken) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;