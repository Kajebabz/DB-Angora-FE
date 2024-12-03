// src/components/shared/enumAutocomplete.tsx
"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { getEnumValues } from '@/services/enumService';
import { RabbitEnum } from '@/types/enumTypes';

interface Props {
    enumType: RabbitEnum;
    value: string | null;
    onChange: (value: string) => void;
    label: string;
    id?: string;
}

export default function EnumAutocomplete({ enumType, value, onChange, label, id }: Props) {
    const [options, setOptions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const loadOptions = async () => {
            try {
                const values = await getEnumValues(enumType);
                setOptions(values);
            } catch (error) {
                console.error(`Failed to load ${enumType} options:`, error);
            } finally {
                setIsLoading(false);
            }
        };
        loadOptions();
    }, [enumType]);

    return (
        <Autocomplete
            id={id || `${enumType.toLowerCase()}-select`}
            label={label}
            labelPlacement="outside"
            defaultSelectedKey={value || undefined}
            onSelectionChange={(key) => onChange(key as string)}
            className="max-w-xs"
            isLoading={isLoading}
        >
            {options.map((option) => (
                <AutocompleteItem key={option} textValue={option}>
                    {option.replace(/_/g, ' ')}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
}