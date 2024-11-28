// app/rabbits/page.tsx (server component)
import { GetOwnRabbits } from '@/services/AngoraDbService';
import { cookies } from 'next/headers';
import RabbitList from './rabbitList';

export default async function RabbitsPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const ownRabbits = await GetOwnRabbits(String(accessToken?.value));
    
    if (!ownRabbits || ownRabbits.length === 0) {
        return <div>No rabbits found</div>;
    }

    return <RabbitList rabbits={ownRabbits} />; // Send array direkte
}