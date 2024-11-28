// app/rabbits/RabbitList.tsx
'use client';

import { Rabbit_PreviewDTO } from '@/types/backendTypes';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RabbitCard from '@/components/cards/rabbitCard';

type Props = {
    rabbits: Rabbit_PreviewDTO[];
};

export default function RabbitList({ rabbits }: Props) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    
    if (!rabbits) {
        return <div>Loading...</div>;
    }
    
    const filteredRabbits = rabbits.filter(rabbit => {
        const matchesSearch = 
            rabbit.nickName.toLowerCase().includes(search.toLowerCase()) ||
            rabbit.earCombId.toLowerCase().includes(search.toLowerCase()) ||
            rabbit.race.toLowerCase().includes(search.toLowerCase());
            
        const matchesGender = filterGender === 'all' || rabbit.gender === filterGender;
        
        return matchesSearch && matchesGender;
    });

    const handleCardClick = (earCombId: string) => {
        router.push(`/rabbits/profile/${earCombId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    placeholder="Søg efter navn, øremærke eller race..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xs"
                />
                <Select
                    placeholder="Filtrer efter køn"
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="max-w-xs"
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Buck" value="Buck">Han</SelectItem>
                    <SelectItem key="Doe" value="Doe">Hun</SelectItem>
                </Select>
            </div>
            
            <div className="rabbit-card-grid">
                {filteredRabbits.map((rabbit) => (
                    <RabbitCard 
                        key={rabbit.earCombId}
                        rabbit={rabbit}
                        onClick={() => handleCardClick(rabbit.earCombId)}
                    />
                ))}
            </div>
        </div>
    );
}