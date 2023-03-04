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
            'Authorization': 'Bearer ' + Cookies.get('credentials')
          }
        });
        const json = await response.json();
        json.responseData && setData(json.responseData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;