import { LoginResponse, RabbitProfileDTO, RabbitResponse } from "@/types/backendTypes";

// ENUMs
export async function GetRaces(): Promise<string[]> {
    const data = await fetch('https://db-angora.azurewebsites.net/api/Enum/Races');
    const races = await data.json();

    return races;
}

export async function GetOwnRabbits(accessToken: string): Promise<RabbitResponse> {

    const data = await fetch('https://db-angora.azurewebsites.net/api/Account/Rabbits_Owned', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const ownRabbits = await data.json();

    return ownRabbits;
}

export async function GetRabbitProfile(accessToken: string): Promise<RabbitProfileDTO> {

    const data = await fetch('https://db-angora.azurewebsites.net/api/Rabbit/Profile/4977-206', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const rabbitProfile = await data.json();

    return rabbitProfile;
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

export async function GetRabbitsForSale(): Promise<RabbitResponse> {

    const data = await fetch('https://db-angora.azurewebsites.net/api/Rabbit/Forsale', {
    });
    const rabbitsForSale = await data.json();

    return rabbitsForSale;
}