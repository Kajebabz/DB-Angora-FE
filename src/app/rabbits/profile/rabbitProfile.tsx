// src/app/rabbits/profile/RabbitProfile.tsx
"use client"

import { RabbitProfileDTO, Rabbit_ChildPreviewDTO } from "@/types/backendTypes";
import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

type Props = {
    rabbitProfile: RabbitProfileDTO;
}

export default function RabbitProfile({ rabbitProfile }: Props) {
    const propertyLabels: Record<keyof Omit<RabbitProfileDTO, "$id" | "children">, string> = {
        earCombId: "Øremærke ID",
        nickName: "Kælenavn",
        originId: "Oprdrætter ID",
        ownerId: "Ejer ID",
        race: "Race",
        color: "Farve",
        approvedRaceColorCombination: "Godkendt Race/Farve Kombination",
        dateOfBirth: "Fødselsdato",
        dateOfDeath: "Dødsdato",
        isJuvenile: "Ungdyr",
        gender: "Køn",
        forSale: "Til salg",
        forBreeding: "Til avl",
        fatherId_Placeholder: "Far ID",
        father_EarCombId: "Far Øremærke",
        motherId_Placeholder: "Mor ID",
        mother_EarCombId: "Mor Øremærke"
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Kanin Profil: {rabbitProfile.nickName}</h1>
            
            <Tabs aria-label="Kanin information">
                <Tab key="details" title="Detaljer">
                    <Table aria-label="Kanin detaljer">
                        <TableHeader>
                            <TableColumn>EGENSKAB</TableColumn>
                            <TableColumn>VÆRDI</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(propertyLabels).map(([key, label]) => (
                                <TableRow key={key}>
                                    <TableCell>{label}</TableCell>
                                    <TableCell>
                                        {key.includes('date') 
                                            ? new Date(rabbitProfile[key as keyof RabbitProfileDTO] as Date).toLocaleDateString()
                                            : key === 'approvedRaceColorCombination' || key === 'isJuvenile'
                                                ? (rabbitProfile[key as keyof RabbitProfileDTO] ? 'Ja' : 'Nej')
                                                : String(rabbitProfile[key as keyof RabbitProfileDTO])}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Tab>

                <Tab key="children" title="Afkom">
                    <Table aria-label="Kanin afkom">
                        <TableHeader>
                            <TableColumn>ØREMÆRKE ID</TableColumn>
                            <TableColumn>ANDEN FORÆLDER ID</TableColumn>
                            <TableColumn>NAVN</TableColumn>
                            <TableColumn>KØN</TableColumn>
                            <TableColumn>FARVE</TableColumn>
                            <TableColumn>FØDSELSDATO</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {rabbitProfile.children.$values.map((child: Rabbit_ChildPreviewDTO) => (
                                <TableRow key={child.earCombId}>
                                    <TableCell>{child.earCombId}</TableCell>
                                    <TableCell>{child.otherParentId}</TableCell>
                                    <TableCell>{child.nickName}</TableCell>
                                    <TableCell>{child.gender}</TableCell>
                                    <TableCell>{child.color}</TableCell>
                                    <TableCell>{new Date(child.dateOfBirth).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
}