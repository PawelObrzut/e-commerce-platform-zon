import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface FetchData<T> {
  data?: T;
  isLoading: boolean;
  error: string | null;
}

const useFetch = <T = unknown>(url: string): FetchData<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('accessToken')
          }
        });
        const json = await response.json();
        json && setData(json)
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    const credentials = Cookies.get('accessToken');
    if (credentials) {
      fetchData();
    } else {
      setIsLoading(false);
      setError('Missing credentials');
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;