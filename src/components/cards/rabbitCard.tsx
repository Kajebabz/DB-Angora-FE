// src/components/cards/rabbitCard.tsx
'use client';

import { Rabbit_ForsalePreviewDTO } from '@/types/backendTypes';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import Image from 'next/image';

interface Props {
    rabbit: Rabbit_ForsalePreviewDTO;
    onClick?: () => void;
}

export default function RabbitCard({ rabbit, onClick }: Props) {
    const profileImage = rabbit.profilePicture || '/default-rabbit.jpg';

    return (
        <Card
            isPressable={!!onClick}
            onPress={onClick}
            className="max-w-sm hover:shadow-lg transition-shadow bg-zinc-800/80 backdrop-blur-md 
        backdrop-saturate-150 border border-zinc-700/50"
        >
            <Image
                src={profileImage}
                alt={`${rabbit.nickName} profile picture`}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
            />
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold text-zinc-100">{rabbit.nickName}</p>
                    <p className="text-small text-zinc-400">{rabbit.earCombId}</p>
                </div>
            </CardHeader>
            <CardBody className="text-zinc-300">
                <p>Fødselsdato: {rabbit.dateOfBirth}</p>
                <p>Race: {rabbit.race}</p>
                <p>Farve: {rabbit.color}</p>
                <p>Køn: {rabbit.gender}</p>
                <p>Postnummer: {rabbit.zipCode}</p>
                <p>By: {rabbit.city}</p>
                <p>Ejer: {rabbit.userOwner}</p>
            </CardBody>
        </Card>
    );
}