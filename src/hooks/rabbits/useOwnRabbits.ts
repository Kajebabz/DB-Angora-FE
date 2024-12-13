// src/hooks/rabbits/useOwnRabbits.ts
import { useState } from 'react';
import { Rabbit_PreviewDTO } from '@/types/backendTypes';

export function useOwnRabbits(initialRabbits: Rabbit_PreviewDTO[]) {
    const [search, setSearch] = useState('');
    const [filterGender, setFilterGender] = useState('all');

    const filteredRabbits = initialRabbits.filter(rabbit => {
        const matchesSearch = 
            rabbit.nickName.toLowerCase().includes(search.toLowerCase()) ||
            rabbit.earCombId.toLowerCase().includes(search.toLowerCase()) ||
            rabbit.race.toLowerCase().includes(search.toLowerCase());
            
        const matchesGender = filterGender === 'all' || rabbit.gender === filterGender;
        
        return matchesSearch && matchesGender;
    });

    return {
        filteredRabbits,
        filters: { search, filterGender },
        setSearch,
        setFilterGender
    };
}