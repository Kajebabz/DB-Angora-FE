// src/components/sectionNav/variants/rabbitOwnNav.tsx
'use client';
import { Input, Select, SelectItem } from "@nextui-org/react";
import SectionNav from '../base/baseSideNav';
import { useRouter } from 'next/navigation';
import { PiRabbitFill } from "react-icons/pi";

interface Props {
    search: string;
    filterGender: string;
    onSearchChange: (value: string) => void;
    onGenderChange: (value: string) => void;
}

export default function OwnNav({ search, filterGender, onSearchChange, onGenderChange }: Props) {
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
                    aria-label="Filtrer efter køn"
                >
                    <SelectItem key="all" value="all">Alle</SelectItem>
                    <SelectItem key="Buck" value="Buck">Han</SelectItem>
                    <SelectItem key="Doe" value="Doe">Hun</SelectItem>
                </Select>
            </div>
        </SectionNav>
    );
}