import { GetOwnRabbits, GetRaces } from '@/Services/AngoraDbService'
import { Rabbit } from '@/Types/backendTypes';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
    const races = await GetRaces();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    console.log("john", accessToken)
    const ownRabbits = await GetOwnRabbits(String(accessToken));

    return (
        <div>
            <ul>
                {races.map((race: string) => (
                    <li key={race}>
                        {race}
                    </li>
                ))}
            </ul>
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
