// src/hooks/useAuth.ts
'use client'
import { useState, useEffect } from 'react';

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/token');
                const { accessToken } = await response.json();
                setIsLoggedIn(!!accessToken);
            } catch (error: unknown) {
                console.error('Auth check failed:', error);
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, []);

    return { isLoggedIn };
}