// src/components/cards/rabbitCard.tsx
'use client';

import { Rabbit_PreviewDTO } from '@/types/backendTypes';
import { Card, CardHeader, CardBody } from '@nextui-org/react';

type Props = {
    rabbit: Rabbit_PreviewDTO;
    onClick?: () => void;
};

export default function RabbitCard({ rabbit, onClick }: Props) {
    return (
        <Card
            isPressable={!!onClick}
            onPress={onClick}
            className="max-w-sm hover:shadow-lg transition-shadow bg-zinc-800/80 backdrop-blur-md 
        backdrop-saturate-150 border border-zinc-700/50"
        >
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold text-zinc-100">{rabbit.nickName}</p>
                    <p className="text-small text-zinc-400">{rabbit.earCombId}</p>
                </div>
            </CardHeader>
            <CardBody className="text-zinc-300">
                <p>Race: {rabbit.race}</p>
                <p>Farve: {rabbit.color}</p>
                <p>Køn: {rabbit.gender}</p>
                <p>Ejer: {rabbit.userOwner}</p>
                <p>Opdrætter: {rabbit.userOrigin}</p>
            </CardBody>
        </Card>
    );
}