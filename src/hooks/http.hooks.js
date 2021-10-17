import { useState, useCallback } from "react";

export const useHttp = () => {
    const [spinner, setSpinner] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'POST', body = null, headers = {'Content-Type': 'application/json'}) => {
        setSpinner(true);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json()

            setSpinner(false);
            return data
        } catch(e){
            setSpinner(false);
            setError(e.message);
            throw e;
        }

    }, []);

    const clearError = useCallback(() => setError(null), [])

    return {spinner, request, error, clearError}
}