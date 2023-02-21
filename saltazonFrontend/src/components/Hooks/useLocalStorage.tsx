import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const storedCart = localStorage.getItem(key);

    if (storedCart) {
      return JSON.parse(storedCart);
    }

    if (initialValue instanceof Function) {
      return (initialValue as () => T)();
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as [typeof storedValue, typeof setStoredValue];
}