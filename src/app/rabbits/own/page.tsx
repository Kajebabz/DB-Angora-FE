import { GetOwnRabbits } from '@/services/AngoraDbService';
import { Rabbit } from '@/types/backendTypes';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const ownRabbits = await GetOwnRabbits(String(accessToken?.value));

    return (
        <div>
            <ul>
                {ownRabbits.$values.map((rabbit: Rabbit) => (
                    <li key={JSON.stringify(rabbit)}>
                        {JSON.stringify(rabbit)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
