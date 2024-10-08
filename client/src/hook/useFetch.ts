import { useState, useEffect, useCallback } from "react";

import { fetchData } from "@/utils/fetch-data";

type UseFetchOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
};

type UseFetchReturn<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    start: () => void;  // Function to manually trigger the fetch
};

export const useFetch = <T,>(
    url: string,
    options?: UseFetchOptions,
    immediate: boolean = true // Immediate fetching control
): UseFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch function to be called manually or automatically
    const start = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchData<T>(url, {
                method: options?.method || 'GET',
                headers: options?.headers || {
                    'Content-Type': 'application/json',
                },
                body: options?.body || null,
            });

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
            start();
        }
    }, [start, immediate]);

    return { data, error, loading, start };
};