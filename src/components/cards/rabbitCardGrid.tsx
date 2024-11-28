// src/components/cards/RabbitCardGrid.tsx
import { Rabbit_PreviewDTO } from '@/types/backendTypes';
import RabbitCard from './rabbitCard';

type Props = {
    rabbits: Rabbit_PreviewDTO[];
    onCardClick?: (rabbit: Rabbit_PreviewDTO) => void;
};

export default function RabbitCardGrid({ rabbits, onCardClick }: Props) {
    return (
        <div className="rabbit-card-grid">
            {rabbits.map((rabbit) => (
                <RabbitCard 
                    key={rabbit.earCombId} 
                    rabbit={rabbit}
                    onClick={() => onCardClick?.(rabbit)}
                />
            ))}
        </div>
    );
}