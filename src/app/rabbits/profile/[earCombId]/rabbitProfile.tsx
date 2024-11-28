// rabbitProfile.tsx
"use client"
import { useState } from 'react';
import { Rabbit_ProfileDTO, Rabbit_UpdateDTO, Rabbit_ChildPreviewDTO } from "@/types/backendTypes";
import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@nextui-org/react";
import { EditRabbit } from "@/services/AngoraDbService";
import { toast } from "react-toastify";

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

    const propertyLabels: Record<keyof Omit<Rabbit_ProfileDTO, "$id" | "children">, string> = {
        earCombId: "Øremærke ID",
        nickName: "Navn",
        originId: "Oprindelse ID",
        ownerId: "Ejer ID",
        race: "Race",
        color: "Farve",
        approvedRaceColorCombination: "Godkendt Race/Farve Kombination",
        dateOfBirth: "Fødselsdato",
        dateOfDeath: "Dødsdato",
        isJuvenile: "Ungdyr",
        gender: "Køn",
        forSale: "Til Salg",
        forBreeding: "Til Avl",
        fatherId_Placeholder: "Far ID",
        father_EarCombId: "Far Øremærke",
        motherId_Placeholder: "Mor ID",
        mother_EarCombId: "Mor Øremærke"
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const response = await fetch('/api/token');  // Updated path
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

    const renderCell = (key: keyof Rabbit_ProfileDTO, value: unknown) => {
        // For display mode
        if (!isEditing || !Object.keys(editedData).includes(key)) {
            if (key.includes('date')) {
                // Check if date string matches format "DD.MM.YYYY" or "YYYY-MM-DD"
                if (typeof value === 'string') {
                    // Try to parse the date string
                    const date = value.includes('.')
                        ? value.split('.').reverse().join('-') // Convert DD.MM.YYYY to YYYY-MM-DD
                        : value;
                    
                    const parsedDate = new Date(date);
                    return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
                        ? parsedDate.toLocaleDateString('da-DK') // Danish format
                        : '-';
                }
                return '-';
            }
            
            if (typeof value === 'boolean') {
                return value ? 'Ja' : 'Nej';
            }
            
            return String(value ?? '-');
        }
    
        // For edit mode
        if (key.includes('date')) {
            let dateValue = '';
            if (value) {
                const date = new Date(value as string);
                if (date instanceof Date && !isNaN(date.getTime())) {
                    dateValue = date.toISOString().split('T')[0];
                }
            }
    
            return (
                <Input
                    type="date"
                    value={dateValue}
                    onChange={(e) => setEditedData({
                        ...editedData,
                        [key]: e.target.value
                    })}
                />
            );
        }

        <Button
            color="primary"
            onClick={handleSave}
            isLoading={isSaving}
            disabled={isSaving}
        >
            Gem
        </Button>
    
        return (
            <Input
                value={String(editedData[key as keyof Rabbit_UpdateDTO] ?? '')}
                onChange={(e) => setEditedData({
                    ...editedData,
                    [key]: e.target.value
                })}
            />
        );
    };

    // <Button
    //         color="primary"
    //         onClick={handleSave}
    //         isLoading={isSaving}
    //         disabled={isSaving}
    //     >
    //         Gem
    //     </Button>
    
    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Kanin Profil: {rabbitProfile.nickName}</h1>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Rediger</Button>
                ) : (
                    <div className="space-x-2">
                        <Button color="primary" onClick={handleSave}>Gem</Button>
                        <Button color="danger" onClick={() => setIsEditing(false)}>Annuller</Button>
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
                                        {renderCell(key as keyof Rabbit_ProfileDTO,
                                            key.includes('date')
                                                ? new Date(rabbitProfile[key as keyof Rabbit_ProfileDTO] as Date).toLocaleDateString()
                                                : key === 'approvedRaceColorCombination' || key === 'isJuvenile'
                                                    ? (rabbitProfile[key as keyof Rabbit_ProfileDTO] ? 'Ja' : 'Nej')
                                                    : String(rabbitProfile[key as keyof Rabbit_ProfileDTO])
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