// hooks/rabbits/useFilteredRabbits.ts
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ForSaleFilters } from '@/types/filterTypes';
import { useRabbitsForSale } from './useRabbitsData';

export function useFilteredRabbits() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Initialize filters from URL
    const initialFilters: ForSaleFilters = {
        rightEarId: searchParams.get('rightEarId') || undefined,
        race: searchParams.get('race') || undefined,
        gender: searchParams.get('gender') || undefined,
    };

    const [filters, setFilters] = useState<ForSaleFilters>(initialFilters);
    const { rabbits, isLoading, error } = useRabbitsForSale(filters);

    const updateFilters = (newFilters: ForSaleFilters) => {
        setFilters(newFilters);
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        router.replace(`/rabbits/for-sale${params.toString() ? `?${params}` : ''}`);
    };

    return { 
        rabbits, 
        filters,
        isLoading, 
        error,
        updateFilters 
    };
}
/*
useFilteredRabbits
Primært ansvar: URL sync og filter management
• Håndterer:
• URL parameters sync
• Filter state
• Routing
• Kombinerer data fra useRabbitsForSale med filter logik
*/