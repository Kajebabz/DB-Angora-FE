// src>services>AngoraDbService.ts
import { LoginResponse, Rabbit_UpdateDTO, Rabbit_ProfileDTO, Rabbits_PreviewList } from "@/types/backendTypes";
import { ForSaleFilters } from "@/types/filterTypes";


export async function GetOwnRabbits(accessToken: string): Promise<Rabbits_PreviewList> {
    const data = await fetch('https://db-angora.dk/api/Account/Rabbits_Owned', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const ownRabbits = await data.json();
    //console.log('API Response:', ownRabbits); // Debug log
    return ownRabbits;
}

export async function GetRabbitsForSale(filters?: ForSaleFilters): Promise<Rabbits_PreviewList> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            // Only add non-empty values to query
            if (value !== undefined && value !== '' && value !== null) {
                if (typeof value === 'boolean') {
                    queryParams.append(key, value.toString());
                } else if (typeof value === 'string' && value.trim() !== '') {
                    queryParams.append(key, value.trim());
                }
            }
        });
    }

    const queryString = queryParams.toString();
    const url = `https://db-angora.dk/api/Rabbit/Forsale${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching URL:', url); // Debug log
    const data = await fetch(url);
    return data.json();
}

export async function GetRabbitsForBreeding(): Promise<Rabbits_PreviewList> {

    const data = await fetch('https://db-angora.dk/api/Rabbit/Forbreeding', {
    });
    const rabbitsForBreeding = await data.json();

    return rabbitsForBreeding;
}

export async function GetRabbitProfile(accessToken: string, earCombId: string): Promise<Rabbit_ProfileDTO> {
    const data = await fetch(`https://db-angora.dk/api/Rabbit/Profile/${earCombId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const rabbitProfile = await data.json();
    //console.log('API Response:', rabbitProfile); // Debug log
    return rabbitProfile;
}

export async function EditRabbit(earCombId: string, rabbitData: Rabbit_UpdateDTO, accessToken: string): Promise<Rabbit_ProfileDTO> {
    const formattedData = {
        ...rabbitData,
        // Ensure dates are in YYYY-MM-DD format
        dateOfBirth: rabbitData.dateOfBirth,
        dateOfDeath: rabbitData.dateOfDeath || null
    };

    const response = await fetch(`https://db-angora.dk/api/Rabbit/Update/${earCombId}`, {
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
    const data = await fetch('https://db-angora.dk/api/Auth/Login', {
        method: "POST",
        body: JSON.stringify({ userName, password, rememberMe }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const ownRabbits = await data.json();

    return ownRabbits;
}
