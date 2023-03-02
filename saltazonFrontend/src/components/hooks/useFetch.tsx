import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  useEffect(() => {
    fetch(url).then(response => {
      if (!response.ok) {
        throw(response.status);
      }
      return response.json();
    }).then(data => {
      setData(data);
    }).catch((error) => {
      setErrorStatus(error)
    })
  }, []);

  return [data, errorStatus];
}

export default useFetch;
