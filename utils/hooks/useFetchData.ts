import { useState, useEffect } from "react";

interface FetchDataResponse<T> {
  data: T | null;
  dataLain: any[] | null;
  error: string | null;
  loading: boolean;
}

const useFetchData = <T>(endpoint: string): FetchDataResponse<T> => {
  const [dataLain, setDataLain] = useState<any[] | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data?data=general");
        if (!response.ok) {
          throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
        }
        const result = await response.json();

        if (endpoint === "general") {
          setData(result?.data?.[0] ?? null);
        } else {
          const response = await fetch(`/api/data?data=${endpoint}`);
          const data = await response.json();
          setData(result?.data?.[0] ?? null);
          setDataLain(data?.data ?? null);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, dataLain, error, loading };
};

export default useFetchData;
