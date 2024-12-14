// src/components/cards/RabbitCardGrid.tsx
import { Rabbit_ForsalePreviewDTO } from '@/types/backendTypes';
import RabbitCard from './rabbitCard';

interface Props {
    rabbits: Rabbit_ForsalePreviewDTO[];
    onCardClick?: (rabbit: Rabbit_ForsalePreviewDTO) => void;
}

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