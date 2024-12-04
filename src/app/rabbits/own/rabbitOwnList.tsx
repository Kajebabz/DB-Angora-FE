// src/app/rabbits/own/rabbitList.tsx
'use client';
import { Rabbit_PreviewDTO } from '@/types/backendTypes';
import { useRouter } from 'next/navigation';
import RabbitCard from '@/components/cards/rabbitCard';
import OwnNav from '@/components/sectionNav/variants/rabbitOwnNav';
import { useOwnRabbits } from '@/hooks/rabbits/useOwnRabbits';

type Props = {
    rabbits: Rabbit_PreviewDTO[];
};

export default function RabbitOwnList({ rabbits }: Props) {
    const router = useRouter();
    const { 
        filteredRabbits, 
        filters, 
        setSearch, 
        setFilterGender 
    } = useOwnRabbits(rabbits);

    const handleCardClick = (earCombId: string) => {
        router.push(`/rabbits/profile/${earCombId}`);
    };

    return (
        <>
            <OwnNav
                search={filters.search}
                filterGender={filters.filterGender}
                onSearchChange={setSearch}
                onGenderChange={setFilterGender}
            />
            <div className="rabbit-card-grid">
                {filteredRabbits.map((rabbit) => (
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