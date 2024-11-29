// src/app/rabbits/profile/[earCombId]/rabbitProfile.tsx
"use client"
import { useState } from 'react';
import { Rabbit_ProfileDTO, Rabbit_UpdateDTO, Rabbit_ChildPreviewDTO } from "@/types/backendTypes";
import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Switch } from "@nextui-org/react";
import { EditRabbit } from "@/services/AngoraDbService";
import { toast } from "react-toastify";
import EnumSelect from '@/components/shared/enumSelect';


type Props = {
    rabbitProfile: Rabbit_ProfileDTO;
};

export default function RabbitProfile({ rabbitProfile }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editedData, setEditedData] = useState<Rabbit_UpdateDTO>({
        nickName: rabbitProfile.nickName,
        race: rabbitProfile.race,
        color: rabbitProfile.color,
        dateOfBirth: rabbitProfile.dateOfBirth,
        dateOfDeath: rabbitProfile.dateOfDeath,
        gender: rabbitProfile.gender,
        forSale: rabbitProfile.forSale,
        forBreeding: rabbitProfile.forBreeding,
        fatherId_Placeholder: rabbitProfile.fatherId_Placeholder,
        motherId_Placeholder: rabbitProfile.motherId_Placeholder,
    });

    const propertyLabels: Record<keyof Omit<Rabbit_ProfileDTO, "father_EarCombId" | "mother_EarCombId" | "children">, string> = {
        earCombId: "Øremærke ID",
        nickName: "Navn",
        originFullName: "Oprdrætter",
        ownerFullName: "Ejer",
        race: "Race",
        color: "Farve",
        approvedRaceColorCombination: "Godkendt race/farve kombination",
        dateOfBirth: "Fødselsdato",
        dateOfDeath: "Dødsdato",
        isJuvenile: "Ungdyr",
        gender: "Køn",
        forSale: "Til salg",
        forBreeding: "Til avl",
        fatherId_Placeholder: "Far øremærke",     // User-editable field
        //father_EarCombId: "System Reference",     // Hidden system field
        motherId_Placeholder: "Mor øremærke",     // User-editable field
        //mother_EarCombId: "System Reference"      // Hidden system field
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const response = await fetch('/api/token');
            if (!response.ok) {
                throw new Error('Failed to get token');
            }

            const { accessToken } = await response.json();
            if (!accessToken) {
                toast.error('Du er ikke logget ind');
                return;
            }

            const result = await EditRabbit(rabbitProfile.earCombId, editedData, accessToken);
            if (result) {
                setIsEditing(false);
                toast.success('Kaninen blev opdateret');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error saving:', error);
            toast.error('Der skete en fejl ved opdatering af kaninen');
        } finally {
            setIsSaving(false);
        }
    };

    const renderParentCell = (placeholder: string | null, matchingId: string | null) => {
        if (!placeholder) return '-';

        return (
            <div className="flex items-center gap-2">
                <span>{placeholder}</span>
                {matchingId ? (
                    <div className="flex items-center text-success">
                        <span className="text-sm">✓ findes i systemet</span>
                    </div>
                ) : (
                    <div className="flex items-center text-warning">
                        <span className="text-sm">⚠ ikke oprettet i systemet</span>
                    </div>
                )}
            </div>
        );
    };

    // Update renderCell to handle both display and edit modes for parent fields
    const renderCell = (key: keyof Rabbit_ProfileDTO, value: unknown) => {
        // Skip rendering system IDs
        if (key === 'father_EarCombId' || key === 'mother_EarCombId') {
            return null;
        }

        // Display mode
        if (!isEditing || !Object.keys(editedData).includes(key)) {
            if (key === 'fatherId_Placeholder' || key === 'motherId_Placeholder') {
                return renderParentCell(
                    value as string,
                    key === 'fatherId_Placeholder' ? rabbitProfile.father_EarCombId : rabbitProfile.mother_EarCombId
                );
            }
            if (typeof value === 'boolean') {
                return value ? 'Ja' : 'Nej';
            }
            return String(value ?? '-');
        }

        if (key === 'race') {
            return (
                <EnumSelect
                    enumType="Race"
                    value={editedData.race}
                    onChange={(value) => setEditedData({...editedData, race: value})}
                    label="Race"
                />
            );
        }

        if (key === 'color') {
            return (
                <EnumSelect
                    enumType="Color"
                    value={editedData.color}
                    onChange={(value) => setEditedData({...editedData, color: value})}
                    label="Color"
                />
            );
        }

        if (key === 'gender') {
            return (
                <EnumSelect
                    enumType="Gender"
                    value={editedData.gender}
                    onChange={(value) => setEditedData({...editedData, gender: value})}
                    label="Gender"
                />
            );
        }

        if (key === 'forSale') {
            return (
                <Switch 
                    isSelected={editedData.forSale === "Ja"}
                    onValueChange={(checked) => setEditedData({
                        ...editedData, 
                        forSale: checked ? "Ja" : "Nej"
                    })}
                    aria-label="Til salg"
                >
                    {editedData.forSale === "Ja" ? "Til salg" : "Ikke til salg"}
                </Switch>
            );
        }
        
        if (key === 'forBreeding') {
            return (
                <Switch 
                    isSelected={editedData.forBreeding === "Ja"}
                    onValueChange={(checked) => setEditedData({
                        ...editedData, 
                        forBreeding: checked ? "Ja" : "Nej"
                    })}
                    aria-label="Til avl"
                >
                    {editedData.forBreeding === "Ja" ? "Til avl" : "Ikke til avl"}
                </Switch>
            );
        }

        // Edit mode - handle all fields including parent IDs
        return (
            <Input
                type="text"
                value={String(editedData[key] ?? '')}
                onChange={(e) => setEditedData({
                    ...editedData,
                    [key]: e.target.value
                })}
                aria-label={propertyLabels[key]}
            />
        );
    };


    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{rabbitProfile.nickName}</h1>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Rediger</Button>
                ) : (
                    <div className="space-x-2">
                        <Button
                            color="primary"
                            onClick={handleSave}
                            isLoading={isSaving}  // Use loading state
                            disabled={isSaving}   // Prevent double-submit
                        >
                            {isSaving ? 'Gemmer...' : 'Gem'}
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => setIsEditing(false)}
                            disabled={isSaving}
                        >
                            Annuller
                        </Button>
                    </div>
                )}
            </div>

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
                                        {renderCell(
                                            key as keyof Rabbit_ProfileDTO,
                                            rabbitProfile[key as keyof Rabbit_ProfileDTO]
                                        )}
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
                            {rabbitProfile.children.map((child: Rabbit_ChildPreviewDTO) => (
                                <TableRow key={child.earCombId}>
                                    <TableCell>{child.earCombId}</TableCell>
                                    <TableCell>{child.otherParentId}</TableCell>
                                    <TableCell>{child.nickName}</TableCell>
                                    <TableCell>{child.gender}</TableCell>
                                    <TableCell>{child.color}</TableCell>
                                    <TableCell>
                                        {child.dateOfBirth ? new Date(child.dateOfBirth).toLocaleDateString('da-DK') : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
}