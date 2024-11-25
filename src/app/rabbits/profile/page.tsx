import { GetRabbitProfile } from '@/services/AngoraDbService'
import { RabbitProfileDTO } from '@/types/backendTypes';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const rabbitProfile = await GetRabbitProfile(String(accessToken?.value));

    return (
        <div>
            <ul>
                {rabbitProfile.$values.map((rabbit: RabbitProfileDTO) => (
                    <li key={JSON.stringify(rabbit)}>
                        {JSON.stringify(rabbit)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
