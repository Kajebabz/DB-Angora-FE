// src/components/sectionNav/variants/rabbitOwnNav.tsx
'use client';
import { Input, Select, SelectItem, Switch } from "@nextui-org/react";
import SectionNav from '../base/baseSideNav';
import { useRouter } from 'next/navigation';
import { PiRabbitFill } from "react-icons/pi";

interface Props {
    search: string;
    filterGender: string;
    filterRace: string;
    filterColor: string;
    filterForSale: string;
    filterForBreeding: string;
    showDeceased: boolean;
    onSearchChange: (value: string) => void;
    onGenderChange: (value: string) => void;
    onRaceChange: (value: string) => void;
    onColorChange: (value: string) => void;
    onForSaleChange: (value: string) => void;
    onForBreedingChange: (value: string) => void;
    onShowDeceasedChange: (value: boolean) => void;
}

export default function OwnNav({ 
    search, filterGender, filterRace, filterColor, 
    filterForSale, filterForBreeding, showDeceased,
    onSearchChange, onGenderChange, onRaceChange, onColorChange,
    onForSaleChange, onForBreedingChange, onShowDeceasedChange
}: Props) {
    const router = useRouter();

    return (
        <SectionNav
            title="Mine Kaniner"
            actions={[
                {
                    label: (
                        <>
                            <PiRabbitFill className="mr-2" />
                            Opret kanin
                        </>
                    ),
                    onClick: () => router.push('/rabbits/create'),
                    color: "success",
                    className: "text-white"
                }
            ]}
        >
            <div className="flex flex-col gap-4">
                <Input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Søg efter navn, øremærke eller race..."
                    aria-label="Søg efter kaniner"
                />
                <Select
                    selectedKeys={[filterGender]}
                    onChange={(e) => onGenderChange(e.target.value)}
                    label="Køn"
                    aria-label="Filtrer efter køn"
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Buck" value="Buck">Han</SelectItem>
                    <SelectItem key="Doe" value="Doe">Hun</SelectItem>
                </Select>
                <Select
                    selectedKeys={[filterRace]}
                    onChange={(e) => onRaceChange(e.target.value)}
                    label="Race"
                    aria-label="Filtrer efter race"
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Angora" value="Angora">Angora</SelectItem>
                </Select>
                <Select
                    selectedKeys={[filterColor]}
                    onChange={(e) => onColorChange(e.target.value)}
                    label="Farve"
                    aria-label="Filtrer efter farve"
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Hvid" value="Hvid">Hvid</SelectItem>
                    <SelectItem key="Sort" value="Sort">Sort</SelectItem>
                </Select>
                <Select
                    selectedKeys={[filterForSale]}
                    onChange={(e) => onForSaleChange(e.target.value)}
                    label="Til Salg"
                    aria-label="Filtrer efter til salg status"
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Ja" value="Ja">Ja</SelectItem>
                    <SelectItem key="Nej" value="Nej">Nej</SelectItem>
                </Select>
                <Select
                    selectedKeys={[filterForBreeding]}
                    onChange={(e) => onForBreedingChange(e.target.value)}
                    label="Til Avl"
                    aria-label="Filtrer efter til avl status"
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Ja" value="Ja">Ja</SelectItem>
                    <SelectItem key="Nej" value="Nej">Nej</SelectItem>
                </Select>
                <Switch
                    isSelected={showDeceased}
                    onValueChange={onShowDeceasedChange}
                    aria-label="Vis afdøde kaniner"
                >
                    Vis afdøde
                </Switch>
            </div>
        </SectionNav>
    );
}