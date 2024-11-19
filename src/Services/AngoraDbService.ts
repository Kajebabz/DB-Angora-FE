import { LoginResponse, RabbitResponse } from "@/Types/backendTypes";

// ENUMs
export async function GetRaces(): Promise<string[]> {
    const data = await fetch('https://db-angora.azurewebsites.net/api/Enum/Races');
    const races = await data.json();

    return races;
}

const majaJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSYWJiaXQ6Q3JlYXRlIjoiT3duIiwiUmFiYml0OlJlYWQiOiJPd24iLCJSYWJiaXQ6VXBkYXRlIjoiT3duIiwiUmFiYml0OkRlbGV0ZSI6Ik93biIsIlJhYmJpdDpJbWFnZUNvdW50IjoiMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkJyZWVkZXJQcmVtaXVtIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJNYWphc0lkIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik1hamEgSHVsc3Ryw7htIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiTWFqYUpvZW5zZW44OUBnbWFpbC5jb20iLCJpYXQiOjE3MzIwMjk3NzYsIm5iZiI6MTczMjAyOTc3NiwiZXhwIjoxNzMyMDMzMzc2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3Mjc2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI3NiJ9.Zw7SXlMGR0IEwY633W6s31m_9123TQRIsRp2zOBoe98';

export async function GetOwnRabbits(accessToken: string): Promise<RabbitResponse> {

    const data = await fetch('https://db-angora.azurewebsites.net/api/Account/Rabbits_Owned', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const ownRabbits = await data.json();

    return ownRabbits;
}

export async function Login(userName: string, password: string, rememberMe: boolean): Promise<LoginResponse> {
    const data = await fetch('https://db-angora.azurewebsites.net/api/Auth/Login', {
        method: "POST",
        body: JSON.stringify({ userName, password, rememberMe }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const ownRabbits = await data.json();

    return ownRabbits;
}

export async function FakeLogin(userName: string, password: string, rememberMe: boolean): Promise<LoginResponse> {
    const fakeLoginResponse: LoginResponse = {
        accessToken: majaJwt,
        $id: 0,
        errors: { $id: 0, $values: [] },
        expiryDate: new Date(),
        refreshToken: "",
        userName: ""
    }

    console.log(userName, password, rememberMe)

    return new Promise(function (resolve) {
        resolve(fakeLoginResponse);
    })
}