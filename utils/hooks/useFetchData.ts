import { useState, useEffect, useCallback } from "react";

interface FetchDataResponse<T> {
  data: T | null;
  dataLain: any[] | null;
  error: string | null;
  loading: boolean;
  mutate: (newData?: any[] | null, shouldRevalidate?: boolean) => Promise<void>;
}

const useFetchData = <T>(endpoint: string): FetchDataResponse<T> => {
  const [dataLain, setDataLain] = useState<any[] | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const responseDataGeneral = await fetch(`/api/data?data=general`);
      const response = await fetch(`/api/data?data=${endpoint}`);

      if (!responseDataGeneral.ok) {
        throw new Error(
          `Error fetching ${endpoint}: ${responseDataGeneral.statusText}`
        );
      }
      if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
      }

      const resultDataGeneral = await responseDataGeneral.json();

      if (endpoint === "general") {
        setData(resultDataGeneral?.data?.[0] ?? null);
      } else {
        const result = await response.json();
        setData(resultDataGeneral?.data?.[0] ?? null);
        setDataLain(result?.data ?? null);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // `mutate` function
  const mutate = useCallback(
    async (newData: any[] | null = null, shouldRevalidate: boolean = true) => {
      if (newData !== null) {
        setDataLain(newData);
      }
      if (shouldRevalidate) {
        await fetchData();
      }
    },
    [fetchData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, dataLain, error, loading, mutate };
};

export default useFetchData;
