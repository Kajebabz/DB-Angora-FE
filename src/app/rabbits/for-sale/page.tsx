// app/rabbits/for-sale/page.tsx
'use client';
import { GetRabbitsForSale } from '@/services/AngoraDbService'
import RabbitCard from '@/components/cards/rabbitCard';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Rabbit_PreviewDTO } from '@/types/backendTypes';

export default function ForSalePage() {
    const router = useRouter();
    const [rabbitsForSale, setRabbitsForSale] = useState<Rabbit_PreviewDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchRabbits = async () => {
            try {
                const result = await GetRabbitsForSale();
                setRabbitsForSale(result); // Direct array now
            } catch (error) {
                console.error('Failed to fetch rabbits:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchRabbits();
    }, []);

    const handleCardClick = (earCombId: string) => {
        router.push(`/rabbits/profile/${earCombId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!rabbitsForSale.length) {
        return <div>Ingen kaniner til salg</div>;
    }

    return (
        <div className="rabbit-card-grid">
            {rabbitsForSale.map((rabbit) => (
                <RabbitCard 
                    key={rabbit.earCombId} 
                    rabbit={rabbit}
                    onClick={() => handleCardClick(rabbit.earCombId)}
                />
            ))}
        </div>
    );
}