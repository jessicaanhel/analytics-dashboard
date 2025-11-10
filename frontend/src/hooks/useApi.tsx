import { useState, useEffect } from "react";

export const useApi = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const API_URL = process.env.REACT_APP_API_URL || ""; // fallback to empty
        const res = await fetch(`${API_URL}${endpoint}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
