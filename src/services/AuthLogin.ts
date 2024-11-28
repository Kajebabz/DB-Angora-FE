// AuthLogin.ts
export async function CookieLogin(userName: string, password: string, rememberMe: boolean): Promise<boolean> {
    try {
        const response = await fetch('http://localhost:3000/api/cookieLogin/', {
            method: "POST",
            body: JSON.stringify({ userName, password, rememberMe }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.ok; // Vi returnerer nu bare om login lykkedes
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}