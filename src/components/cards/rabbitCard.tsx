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
            className="rabbit-card"
        >
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold">{rabbit.nickName}</p>
                    <p className="text-small text-default-500">{rabbit.earCombId}</p>
                </div>
            </CardHeader>
            <CardBody>
                <p>Race: {rabbit.race}</p>
                <p>Farve: {rabbit.color}</p>
                <p>Køn: {rabbit.gender}</p>
                <p>Ejer: {rabbit.userOwner}</p>
                <p>Opdrætter: {rabbit.userOrigin}</p>
            </CardBody>
        </Card>
    );
}