// src/components/sectionNav/variants/forSaleNav.tsx
'use client';
import { Input, Button } from "@nextui-org/react";
import { ForSaleFilters } from "@/types/filterTypes";
import SectionNav from '../base/sectionNav';
import EnumSelect from '@/components/shared/enumSelect';
import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";

interface Props {
    activeFilters?: ForSaleFilters;
    onFilterChange: (filters: ForSaleFilters) => void;
}

export default function ForSaleNav({ activeFilters = {}, onFilterChange }: Props) {
    const [localFilters, setLocalFilters] = useState<ForSaleFilters>(activeFilters);

    useEffect(() => {
        setLocalFilters(activeFilters);
    }, [activeFilters]);

    const handleLocalFilter = (key: keyof ForSaleFilters, value: string | null) => {
        if (!value) {
            const newFilters = { ...localFilters };
            delete newFilters[key];
            setLocalFilters(newFilters);
        } else {
            setLocalFilters(prev => ({ ...prev, [key]: value }));
        }
    };

    const handleClear = (key: keyof ForSaleFilters) => {
        const newFilters = { ...localFilters };
        delete newFilters[key];
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleSearch = () => {
        onFilterChange(localFilters);
    };

    return (
        <SectionNav title="Kaniner til salg" actions={[{ label: "Søg", onClick: handleSearch, color: "primary" as const }]}>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <Input 
                        placeholder="Søg ID..."
                        value={localFilters.rightEarId ?? ''}
                        onChange={(e) => handleLocalFilter('rightEarId', e.target.value || null)}
                        className="max-w-xs"
                        endContent={
                            localFilters.rightEarId && (
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={() => handleClear('rightEarId')}
                                >
                                    <IoMdClose />
                                </Button>
                            )
                        }
                    />
                </div>
                <div className="flex items-center gap-2 min-w-[200px]">
                    <EnumSelect
                        enumType="Race"
                        value={localFilters.race ?? null}
                        onChange={(value) => handleLocalFilter('race', value)}
                        label="Race"
                    />
                    {localFilters.race && (
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onClick={() => handleClear('race')}
                        >
                            <IoMdClose />
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-2 min-w-[200px]">
                    <EnumSelect
                        enumType="Gender"
                        value={localFilters.gender ?? null}
                        onChange={(value) => handleLocalFilter('gender', value)}
                        label="Køn"
                    />
                    {localFilters.gender && (
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onClick={() => handleClear('gender')}
                        >
                            <IoMdClose />
                        </Button>
                    )}
                </div>
            </div>
        </SectionNav>
    );
}