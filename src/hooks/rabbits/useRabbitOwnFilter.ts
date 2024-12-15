// src/hooks/rabbits/useRabbitOwnFilter.ts
import { useState } from 'react';
import { Rabbit_PreviewDTO } from '@/types/backendTypes';

export function useOwnRabbits(initialRabbits: Rabbit_PreviewDTO[]) {
    const [search, setSearch] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    const [filterRace, setFilterRace] = useState('all');
    const [filterColor, setFilterColor] = useState('all');
    const [filterForSale, setFilterForSale] = useState('all');
    const [filterForBreeding, setFilterForBreeding] = useState('all');
    const [showDeceased, setShowDeceased] = useState(false);

    const filteredRabbits = initialRabbits.filter(rabbit => {
        // Exclusive deceased/living filter
        const isDeceased = rabbit.dateOfDeath !== null;
        if (showDeceased !== isDeceased) return false;

        // Search across multiple fields with null checks
        const matchesSearch = search === '' || (
            (rabbit.nickName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            (rabbit.earCombId.toLowerCase().includes(search.toLowerCase())) ||
            (rabbit.race?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            (rabbit.color?.toLowerCase().includes(search.toLowerCase()) ?? false)
        );
        
        // Handle all filter conditions with null checks
        const matchesGender = filterGender === 'all' || rabbit.gender === filterGender;
        const matchesRace = filterRace === 'all' || rabbit.race === filterRace;
        const matchesColor = filterColor === 'all' || rabbit.color === filterColor;
        const matchesForSale = filterForSale === 'all' || rabbit.forSale === filterForSale;
        const matchesForBreeding = filterForBreeding === 'all' || rabbit.forBreeding === filterForBreeding;
        
        return matchesSearch && matchesGender && matchesRace && 
               matchesColor && matchesForSale && matchesForBreeding;
    });

    return {
        filteredRabbits,
        filters: { 
            search, filterGender, filterRace, filterColor, 
            filterForSale, filterForBreeding, showDeceased 
        },
        setSearch,
        setFilterGender,
        setFilterRace,
        setFilterColor,
        setFilterForSale,
        setFilterForBreeding,
        setShowDeceased
    };
}