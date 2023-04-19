import { useMemo } from 'react';

export const useRandomString = (length: number) => {
    const randomString = useMemo(() => {
        return Math.random().toString(36).substr(2, length);
    }, [length]);
    
    return randomString;
}
