import { LoginResponse, Rabbit_UpdateDTO, RabbitProfileDTO, RabbitResponse } from "@/types/backendTypes";



// ENUM
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

    const data = await fetch('https://db-angora.azurewebsites.net/api/Rabbit/Profile/4977-315', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const rabbitProfile = await data.json();

    return rabbitProfile;
}

export async function EditRabbit(earCombId: string, rabbitData: Rabbit_UpdateDTO, accessToken: string): Promise<RabbitProfileDTO> {
    const formattedData = {
        ...rabbitData,
        // Ensure dates are in YYYY-MM-DD format
        dateOfBirth: rabbitData.dateOfBirth,
        dateOfDeath: rabbitData.dateOfDeath || null
    };

    const response = await fetch(`https://db-angora.azurewebsites.net/api/Rabbit/Update/${earCombId}`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'text/plain'  // TODO: check om unødvendig, når edit virker
        },
        body: JSON.stringify(formattedData)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
            sentData: formattedData
        });
        throw new Error(`Failed to update rabbit: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
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