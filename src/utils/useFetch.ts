import { useState, useEffect, useRef } from "react";
const API_BASE_URL = `https://my-json-server.typicode.com/cutamar/mock`;

const useFetch = <T>(
  url: string
): { data: T | null; loading: boolean; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (controller.current) {
          controller.current.abort();
        }
        controller.current = new AbortController();
        const response = await fetch(`${API_BASE_URL}${url}`, {
          signal: controller.current.signal,
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const result: T = await response.json();
        setData(result);
      } catch (error: unknown) {
        const errorResponse = error as { name: string; message: string };
        if (errorResponse.name !== "AbortError") {
          setError(errorResponse.message || "An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.current?.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
