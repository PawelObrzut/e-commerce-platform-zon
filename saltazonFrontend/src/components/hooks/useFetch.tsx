import { useEffect, useState } from 'react';

interface FetchData {
  data: any | null;
  isLoading: boolean;
  error: string | null;
}

const useFetch = (url: string, page: number, options?: any): FetchData => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}?page=${page}&limit=12`, options);
        const json = await response.json();
        setData(json.responseData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};

export default useFetch;