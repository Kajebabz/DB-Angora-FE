// src/app/rabbits/profile/[earCombId]/rabbitProfile.tsx
"use client"
import { Rabbit_ProfileDTO } from "@/types/backendTypes";
import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Switch } from "@nextui-org/react";
import EnumAutocomplete from '@/components/enumHandlers/enumAutocomplete';  // Fix pathimport RabbitProfileNav from '@/components/sectionNav/variants/rabbitProfileNav';
import { useRabbitProfile } from '@/hooks/rabbits/useRabbitProfile';
import { toast } from "react-toastify";
import RabbitProfileNav from "@/components/sectionNav/variants/rabbitProfileNav";

type Props = {
    rabbitProfile: Rabbit_ProfileDTO;
};

export default function RabbitProfile({ rabbitProfile }: Props) {
    const {
        editedData,
        isEditing,
        isSaving,
        isDeleting,
        setEditedData,
        setIsEditing,
        handleSave,
        handleDelete
    } = useRabbitProfile(rabbitProfile);

    const handleChangeOwner = async () => {
        toast.info('Skift ejer funktionalitet kommer snart');
    };

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
        fatherId_Placeholder: "Far øremærke",
        motherId_Placeholder: "Mor øremærke",
    };

    const renderCell = (key: keyof Rabbit_ProfileDTO, value: unknown) => {
        if (!isEditing) {
            if (key === 'dateOfBirth' || key === 'dateOfDeath') {
                return value ? new Date(value as string).toLocaleDateString() : 'Ikke angivet';
            }
            if (typeof value === 'boolean') {
                return value ? 'Ja' : 'Nej';
            }
            return value?.toString() || 'Ikke angivet';
        }

        if (key === 'nickName') {
            return (
                <Input
                    value={editedData.nickName || ''}
                    onChange={(e) => setEditedData({ ...editedData, nickName: e.target.value })}
                    aria-label="Navn"
                />
            );
        }

        if (key === 'race') {
            return (
                <EnumAutocomplete
                    enumType="Race"
                    value={editedData.race}
                    onChange={(value) => setEditedData({ ...editedData, race: value })}
                    label="Race"
                />
            );
        }

        if (key === 'color') {
            return (
                <EnumAutocomplete
                    enumType="Color"
                    value={editedData.color}
                    onChange={(value) => setEditedData({ ...editedData, color: value })}
                    label="Farve"
                />
            );
        }

        if (key === 'gender') {
            return (
                <EnumAutocomplete
                    enumType="Gender"
                    value={editedData.gender}
                    onChange={(value) => setEditedData({ ...editedData, gender: value })}
                    label="Køn"
                />
            );
        }

        if (key === 'forSale' || key === 'forBreeding') {
            return (
                <Switch
                    isSelected={editedData[key] === "Ja"}
                    onValueChange={(checked) => setEditedData({
                        ...editedData,
                        [key]: checked ? "Ja" : "Nej"
                    })}
                    aria-label={propertyLabels[key]}
                >
                    {propertyLabels[key]}
                </Switch>
            );
        }

        if (key === 'dateOfBirth' || key === 'dateOfDeath') {
            return (
                <Input
                    type="date"
                    value={editedData[key] || ''}
                    onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                    aria-label={propertyLabels[key]}
                />
            );
        }

        return value?.toString() || 'Ikke angivet';
    };

    return (
        <>
            <RabbitProfileNav
                rabbitName={rabbitProfile.nickName || rabbitProfile.earCombId}
                onDelete={handleDelete}
                onChangeOwner={handleChangeOwner}
                isDeleting={isDeleting}
            />
            <div className="w-full max-w-5xl mx-auto p-4">
                <div className="content-card mb-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-zinc-100">
                            {rabbitProfile.nickName || rabbitProfile.earCombId}
                        </h1>
                        {!isEditing ? (
                            <Button onClick={() => setIsEditing(true)}>Rediger</Button>
                        ) : (
                            <div className="space-x-2">
                                <Button
                                    color="success"
                                    onClick={handleSave}
                                    isLoading={isSaving}
                                    disabled={isSaving}
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
                </div>

                <Tabs
                    aria-label="Kanin information"
                    className="content-card"
                    variant="bordered"
                    color="success"
                >
                    <Tab key="details" title="Detaljer">
                        <Table
                            aria-label="Kanin detaljer"
                            removeWrapper
                            className="p-0"
                            classNames={{
                                table: "bg-zinc-800/80 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-zinc-700/50",
                                th: "bg-zinc-900/50 text-zinc-300 border-b border-zinc-700/50",
                                td: "text-zinc-100",
                                tr: "hover:bg-zinc-700/30 border-b border-zinc-700/30 last:border-0",
                            }}
                        >
                            <TableHeader>
                                <TableColumn>FELT</TableColumn>
                                <TableColumn>VÆRDI</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(propertyLabels).map(([key, label]) => (
                                    <TableRow key={key}>
                                        <TableCell className="font-medium">{label}</TableCell>
                                        <TableCell>
                                            {renderCell(key as keyof Rabbit_ProfileDTO, rabbitProfile[key as keyof Rabbit_ProfileDTO])}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Tab>

                    <Tab key="children" title="Afkom">
                        <Table
                            aria-label="Afkom liste"
                            removeWrapper
                            className="p-0"
                            classNames={{
                                table: "bg-zinc-800/80 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-zinc-700/50",
                                th: "bg-zinc-900/50 text-zinc-300 border-b border-zinc-700/50",
                                td: "text-zinc-100",
                                tr: "hover:bg-zinc-700/30 border-b border-zinc-700/30 last:border-0",
                            }}
                        >
                            <TableHeader>
                                <TableColumn>ØREMÆRKE ID</TableColumn>
                                <TableColumn>ANDEN FORÆLDER ID</TableColumn>
                                <TableColumn>NAVN</TableColumn>
                                <TableColumn>KØN</TableColumn>
                                <TableColumn>FARVE</TableColumn>
                                <TableColumn>FØDSELSDATO</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {rabbitProfile.children?.map((child) => (
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
                                )) ?? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">
                                                Ingen afkom registreret
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}