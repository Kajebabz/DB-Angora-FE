// src/hooks/useAuth.ts
'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/token', {
                method: 'HEAD'
            });
            
            // Check authentication status from header
            setIsLoggedIn(response.headers.get('X-Is-Authenticated') === 'true');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Auth check fejlede:', error.message);
            }
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' });
            setIsLoggedIn(false);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout fejlede:', error);
        }
    };

    return {
        isLoggedIn,
        logout,
        refresh: checkAuth
    };
}
/*
WHY THIS HOOK IS NEEDED:
1. Auth State Management:
   - Centraliseret håndtering af login status
   - Reactive opdatering af UI komponenter
   - Single source of truth for auth state

2. Authentication Flow:
   - checkAuth: Sikker token validering via HEAD request
   - logout: Sikker cookie sletning og redirect
   - refresh: Manuel trigger af auth check

3. Integration med Next.js:
   - Client-side auth status check
   - Server-side redirect håndtering
   - Route beskyttelse via middleware

4. Security Features:
   - Ingen direkte token manipulation i frontend
   - Sikker cookie håndtering via API
   - Separation mellem auth status og token access

5. Error Handling:
   - Graceful degradation ved network fejl
   - Konsistent fejlhåndtering
   - Automatisk logout ved invalid state
*/