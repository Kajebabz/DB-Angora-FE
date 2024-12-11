import { getApiUrl } from "@/config/apiConfig";
import { LoginResponse, Rabbit_UpdateDTO, Rabbit_ProfileDTO, Rabbits_PreviewList } from "@/types/backendTypes";



// ENUM
export async function GetRaces(): Promise<string[]> {
    const data = await fetch('https://db-angora.azurewebsites.net/api/Enum/Races');
    const races = await data.json();

    return races;
}

// export async function GetOwnRabbits(accessToken: string): Promise<Rabbits_PreviewList> {
//     const data = await fetch('https://db-angora.azurewebsites.net/api/Account/Rabbits_Owned', {
//         headers: { Authorization: `Bearer ${accessToken}` }
//     });
//     const ownRabbits = await data.json();
//     //console.log('API Response:', ownRabbits); // Debug log
//     return ownRabbits;
// }

export async function GetOwnRabbits(accessToken: string): Promise<Rabbits_PreviewList> {
    const data = await fetch(getApiUrl('Account/Rabbits_Owned'), {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const ownRabbits = await data.json();
    //console.log('API Response:', ownRabbits); // Debug log
    return ownRabbits;
}

export async function GetRabbitProfile(accessToken: string, earCombId: string): Promise<Rabbit_ProfileDTO> {
    const data = await fetch(getApiUrl(`/Rabbit/Profile/${earCombId}`), {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const rabbitProfile = await data.json();
    console.log('API Response:', rabbitProfile); // Debug log
    return rabbitProfile;
}

export async function EditRabbit(earCombId: string, rabbitData: Rabbit_UpdateDTO, accessToken: string): Promise<Rabbit_ProfileDTO> {
    const formattedData = {
        ...rabbitData,
        // Ensure dates are in YYYY-MM-DD format
        dateOfBirth: rabbitData.dateOfBirth,
        dateOfDeath: rabbitData.dateOfDeath || null
    };

    const response = await fetch(getApiUrl(`/Rabbit/Update/${earCombId}`), {
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
    const data = await fetch(getApiUrl('/Auth/Login'), {
        method: "POST",
        body: JSON.stringify({ userName, password, rememberMe }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const ownRabbits = await data.json();

    return ownRabbits;
}

export async function GetRabbitsForSale(): Promise<Rabbits_PreviewList> {

    const data = await fetch(getApiUrl('/Rabbit/Forsale'), {
    });
    const rabbitsForSale = await data.json();

    return rabbitsForSale;
}