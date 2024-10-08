import { useState, useCallback } from "react";

type UseLoadingReturn = {
    loading: boolean;
    error: string | null;
    setLoading: (isLoading: boolean) => void;
    withLoading: <T>(fn: () => Promise<T>) => Promise<{ result?: T, error?: string | null }>
};

export const useLoading = (): UseLoadingReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const withLoading = useCallback(async<T>(fn: () => Promise<T>): Promise<{ result?: T, error?: string | null }> => {
        setLoading(true);
        try {
            const result = await fn();
            return { result };
        } catch (e: any) {
            setError(e.message);
            return { error: e.message };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        setLoading,
        withLoading
    };
};