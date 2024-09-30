import { useState, useEffect, useCallback } from "react";

type UseFetchOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
};

type UseFetchReturn<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    fetchData: () => void;  // Function to manually trigger the fetch
};

export const useFetch = <T,>(
    url: string,
    options?: UseFetchOptions,
    immediate: boolean = true // Immediate fetching control
): UseFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

    // Fetch function to be called manually or automatically
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_API_URL}${url}`, {
                method: options?.method || 'GET',
                headers: options?.headers || {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: options?.body || null,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail);
            }

            const result: T = await response.json();
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    // Automatically trigger the fetch if immediate is true
    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, error, loading, fetchData };
};