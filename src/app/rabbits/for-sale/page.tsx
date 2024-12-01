// app/rabbits/for-sale/page.tsx
'use client';
import { GetRabbitsForSale } from '@/services/AngoraDbService';
import RabbitCard from '@/components/cards/rabbitCard';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Rabbit_PreviewDTO } from '@/types/backendTypes';
import { ForSaleFilters } from "@/types/filterTypes";
import ForSaleNav from '@/components/sectionNav/variants/forSaleNav';


export default function ForSalePage() {
    const router = useRouter();
    const [rabbitsForSale, setRabbitsForSale] = useState<Rabbit_PreviewDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState<ForSaleFilters>({});

    // Only fetch when activeFilters changes
    useEffect(() => {
        const fetchRabbits = async () => {
            try {
                setIsLoading(true);
                const result = await GetRabbitsForSale(activeFilters);
                setRabbitsForSale(result);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRabbits();
    }, [activeFilters]);

    const handleFilterChange = (filters: ForSaleFilters) => {
        setActiveFilters(filters);
    };

    const handleCardClick = (earCombId: string) => {
        router.push(`/rabbits/profile/${earCombId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ForSaleNav 
                activeFilters={activeFilters} 
                onFilterChange={handleFilterChange} 
            />
            <div className="rabbit-card-grid">
                {rabbitsForSale.map((rabbit) => (
                    <RabbitCard 
                        key={rabbit.earCombId} 
                        rabbit={rabbit}
                        onClick={() => handleCardClick(rabbit.earCombId)}
                    />
                ))}
            </div>
        </>
    );
}