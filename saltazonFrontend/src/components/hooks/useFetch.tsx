import { useEffect, useState } from 'react';
import useAuth from './useAuth';

interface FetchData<T> {
  data?: T;
  isLoading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<T>>
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
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user?.accessToken
          }
        })
        .then(response => {
          if (response.status === 401) {
            setRefreshClass(true)
          }
          return response.json();
        })
        .then(data => {
          setData(data)
          setIsLoading(false);
          setRefreshClass(false)
        })
        .catch(error => {
          return new Error(error)
        })

      } catch (error) {
        console.log(error)
        setIsLoading(false);
        setError(error.message);
      }
    };
    if (user.accessToken) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, error, setData };
};

export default useFetch;
