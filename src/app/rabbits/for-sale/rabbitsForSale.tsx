// src/app/rabbits/for-sale/rabbitsForSale.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useFilteredRabbits } from '@/hooks/rabbits/useRabbitFilters';
import ForSaleNav from '@/components/sectionNav/variants/rabbitSaleNav';
import RabbitCard from '@/components/cards/rabbitCard';

export default function RabbitsForSalePage() {
    const router = useRouter();
    const { rabbits, filters, isLoading, updateFilters } = useFilteredRabbits();

    const handleCardClick = (earCombId: string) => {
        router.push(`/rabbits/profile/${earCombId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ForSaleNav 
                activeFilters={filters} 
                onFilterChange={updateFilters} 
            />
            <div className="rabbit-card-grid">
                {rabbits.map((rabbit) => (
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