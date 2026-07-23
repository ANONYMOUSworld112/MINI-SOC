import { useState, useEffect } from 'react';

export function useApi<T>(url: string, fallbackData: T) {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from the API.
    // Here we just simulate network delay and return mock data.
    const timer = setTimeout(() => {
      setData(fallbackData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [url, fallbackData]);

  return { data, loading, error };
}
