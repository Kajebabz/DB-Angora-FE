import { LoginResponse } from "@/types/backendTypes";

export async function CookieLogin(userName: string, password: string, rememberMe: boolean): Promise<LoginResponse> {
    const data = await fetch('http://localhost:3000/api/cookieLogin/', {
        method: "POST",
        body: JSON.stringify({ userName, password, rememberMe }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const ownRabbits = await data.json();

    return ownRabbits;
}