// app/rabbits/for-sale/page.tsx
'use client';
import { GetRabbitsForSale } from '@/services/AngoraDbService';
import RabbitCard from '@/components/cards/rabbitCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Rabbit_PreviewDTO } from '@/types/backendTypes';
import { ForSaleFilters } from "@/types/filterTypes";
import ForSaleNav from '@/components/sectionNav/variants/forSaleNav';

export default function ForSalePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [rabbitsForSale, setRabbitsForSale] = useState<Rabbit_PreviewDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize filters from URL params
    const initialFilters: ForSaleFilters = {
        rightEarId: searchParams.get('rightEarId') || undefined,
        race: searchParams.get('race') || undefined,
        gender: searchParams.get('gender') || undefined,
    };
    const [activeFilters, setActiveFilters] = useState<ForSaleFilters>(initialFilters);

    // Fetch rabbits when filters change
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
        // Update state
        setActiveFilters(filters);

        // Update URL with new filters
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        
        // Replace current URL with new params
        const newUrl = params.toString() 
            ? `/rabbits/for-sale?${params.toString()}`
            : '/rabbits/for-sale';
            
        router.replace(newUrl);
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