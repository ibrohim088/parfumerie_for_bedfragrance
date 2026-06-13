import { useEffect, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useRef(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue.current = value;
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue.current;
}
