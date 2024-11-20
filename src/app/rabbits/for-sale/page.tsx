import { GetRabbitsForSale } from '@/services/AngoraDbService'
import { Rabbit } from '@/types/backendTypes';
import React from 'react'

export default async function page() {
    
    const rabbitsForSale = await GetRabbitsForSale()

    return (
        <div>
            <ul>
                {rabbitsForSale.$values.map((rabbit: Rabbit) => (
                    <li key={JSON.stringify(rabbit)}>
                        {JSON.stringify(rabbit)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
