const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

type FetchOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
};

export const fetchData = async <T>(url: string, options: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}) => {
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
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
};