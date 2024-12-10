// src/services/AuthLoginService.ts  <- Fix filename typo
export async function CookieLogin(userName: string, password: string, rememberMe: boolean): Promise<boolean> {
    try {
        console.log('Login attempt:', { userName });
        
        const response = await fetch('/api/auth/login', {  // Updated path
            method: "POST",
            body: JSON.stringify({ userName, password, rememberMe }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Login failed:', { status: response.status, text });
            return false;
        }

        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}