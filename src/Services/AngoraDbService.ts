// src/services/AngoraDbService.ts
import { LoginResponse, Rabbit_UpdateDTO, Rabbit_ProfileDTO, Rabbits_PreviewList, Rabbit_PreviewDTO, Rabbit_CreateDTO } from "@/types/backendTypes";
import { ForSaleFilters } from "@/types/filterTypes";
import { getApiUrl } from '@/config/apiConfig';

export async function CreateRabbit(rabbitData: Rabbit_CreateDTO, accessToken: string): Promise<Rabbit_ProfileDTO> {
    const response = await fetch(getApiUrl('Rabbit/Create'), {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'text/plain'
        },
        body: JSON.stringify(rabbitData)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
            sentData: rabbitData
        });
        throw new Error(`Failed to create rabbit: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function GetOwnRabbits(accessToken: string): Promise<Rabbits_PreviewList> {
    const data = await fetch(getApiUrl('Account/Rabbits_Owned'), {
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
    const url = `${getApiUrl('Rabbit/Forsale')}${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching URL:', url);
    const data = await fetch(url);
    return data.json();
}

export async function GetRabbitsForBreeding(): Promise<Rabbits_PreviewList> {
    const data = await fetch(getApiUrl('Rabbit/Forbreeding'));
    return data.json();
}

export async function GetRabbitProfile(accessToken: string, earCombId: string): Promise<Rabbit_ProfileDTO> {
    const data = await fetch(getApiUrl(`Rabbit/Profile/${earCombId}`), {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    const rabbitProfile = await data.json();
    //console.log('API Response:', rabbitProfile); // Debug log
    return rabbitProfile;
}

export async function EditRabbit(earCombId: string, rabbitData: Rabbit_UpdateDTO, accessToken: string): Promise<Rabbit_ProfileDTO> {
    const formattedData = {
        ...rabbitData,
        dateOfBirth: rabbitData.dateOfBirth,
        dateOfDeath: rabbitData.dateOfDeath || null
    };

    const response = await fetch(getApiUrl(`Rabbit/Update/${earCombId}`), {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'text/plain'
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

export async function DeleteRabbit(earCombId: string, accessToken: string): Promise<Rabbit_PreviewDTO> {
    const response = await fetch(getApiUrl(`Rabbit/Delete/${earCombId}`), {
        method: 'DELETE',
        headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': 'text/plain'
        }
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
        });
        throw new Error(`Failed to delete rabbit: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// export async function Login(userName: string, password: string, rememberMe: boolean): Promise<LoginResponse> {
//     const data = await fetch('https://db-angora.dk/api/Auth/Login', {
//         method: "POST",
//         body: JSON.stringify({ userName, password, rememberMe }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
//     const ownRabbits = await data.json();

//     return ownRabbits;
// }

export async function Login(userName: string, password: string, rememberMe: boolean): Promise<LoginResponse> {
    const data = await fetch(getApiUrl('Auth/Login'), {
        method: "POST",
        body: JSON.stringify({ userName, password, rememberMe }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return data.json();
}
