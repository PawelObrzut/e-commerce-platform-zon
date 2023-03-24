import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { PaginateDetailsInterface } from '../../types';

interface FetchData<T> {
  data?: T;
  isLoading: boolean;
  error: string | null;
  details?: PaginateDetailsInterface
}

const useFetch = <T = unknown>(url: string): FetchData<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState({} as PaginateDetailsInterface);

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
        json && setDetails({
          limit: json.limit,
          page: json.page,
          next: json.next,
          count: json.count
        })
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error, details };
};

export default useFetch;