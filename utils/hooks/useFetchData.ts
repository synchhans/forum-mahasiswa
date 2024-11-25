import { useState, useEffect } from "react";

interface FetchDataResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useFetchData = <T>(endpoint: string): FetchDataResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data?data=${endpoint}`);
        if (!response.ok) {
          throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
        }
        const result = await response.json();

        if (endpoint === "general") {
          setData(result?.data?.[0] ?? null);
        } else {
          setData(result?.data ?? null);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
};

export default useFetchData;
