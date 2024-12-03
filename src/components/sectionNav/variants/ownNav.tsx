// src/components/sectionNav/variants/ownNav.tsx
'use client';
import { Input, Select, SelectItem } from "@nextui-org/react";
import SectionNav from '../base/sectionNav';

interface Props {
    search: string;
    filterGender: string;
    onSearchChange: (value: string) => void;
    onGenderChange: (value: string) => void;
}

export default function OwnNav({ search, filterGender, onSearchChange, onGenderChange }: Props) {
    return (
        <SectionNav title="Mine Kaniner">
            <div className="flex flex-col gap-4">
                <Input
                    placeholder="Søg efter navn, øremærke eller race..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <Select
                    placeholder="Filtrer efter køn"
                    value={filterGender}
                    onChange={(e) => onGenderChange(e.target.value)}
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Buck" value="Buck">Han</SelectItem>
                    <SelectItem key="Doe" value="Doe">Hun</SelectItem>
                </Select>
            </div>
        </SectionNav>
    );
}