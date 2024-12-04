// components/sectionNav/variants/forSaleNav.tsx
'use client';
import { Input, Button, Switch } from "@nextui-org/react";
import { ForSaleFilters } from "@/types/filterTypes";
import SectionNav from '../base/sectionNav';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import EnumAutocomplete from '@/components/shared/enumAutocomplete'; // Fix import path

interface Props {
    activeFilters: ForSaleFilters;
    onFilterChange: (filters: ForSaleFilters) => void;
}

export default function ForSaleNav({ activeFilters, onFilterChange }: Props) {
    const [localFilters, setLocalFilters] = useState<ForSaleFilters>(activeFilters);

    const handleLocalFilter = (key: keyof ForSaleFilters, value: string | null) => {
        const newFilters = { ...localFilters };
        if (!value) {
            delete newFilters[key];
        } else {
            switch (key) {
                case 'isJuvenile':
                case 'approvedRaceColorCombination':
                    newFilters[key] = value === 'true';
                    break;
                case 'rightEarId':
                case 'race':
                case 'color':
                case 'gender':
                    newFilters[key] = value;
                    break;
            }
        }
        setLocalFilters(newFilters);
    };

    const handleSearch = () => onFilterChange(localFilters);
    const handleClear = (key: keyof ForSaleFilters) => {
        const newFilters = { ...localFilters };
        delete newFilters[key];
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <SectionNav
            title="Kaniner til salg"
            actions={[{ label: "Søg", onClick: handleSearch, color: "primary" as const }]}
        >
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
                    <EnumAutocomplete
                        enumType="Race"
                        value={localFilters.race ?? null}
                        onChange={(value) => handleLocalFilter('race', value)}
                        label="Race"
                        id="race-select"
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
                    <EnumAutocomplete
                        enumType="Color"
                        value={localFilters.color ?? null}
                        onChange={(value) => handleLocalFilter('color', value)}
                        label="Farve"
                    />
                    {localFilters.color && (
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onClick={() => handleClear('color')}
                        >
                            <IoMdClose />
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2 min-w-[200px]">
                    <EnumAutocomplete
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

                <div className="flex items-center gap-2">
                    {/* Fix Switch labeling */}
                    <Switch
                        id="approved-combination"
                        aria-labelledby="approved-combination-label"
                        isSelected={localFilters.approvedRaceColorCombination || false}
                        onValueChange={(checked) => {
                            handleLocalFilter('approvedRaceColorCombination', checked ? 'true' : null);
                        }}
                    >
                        <span id="approved-combination-label">
                            Godkendt kombination
                        </span>
                    </Switch>
                </div>
            </div>
        </SectionNav>
    );
}