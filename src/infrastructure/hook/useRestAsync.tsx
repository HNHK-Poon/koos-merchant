import { useEffect, useState } from 'react';

export const useRestAsync = (fn: any) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);
    console.log('in useAsync', fn);
    useEffect(() => {
        fn()
            .then((response: any) => setData(response.data))
            .catch((error: any) => setError(error.message))
            .finally(() => setLoaded(true));
    }, []);
    return { data, error, loaded };
};
