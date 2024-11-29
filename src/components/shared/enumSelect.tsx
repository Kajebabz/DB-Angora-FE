// src/components/shared/enumSelect.tsx
"use client"
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { getEnumValues } from '@/services/enumService';
import { RabbitEnum } from '@/types/enumTypes';

interface Props {
    enumType: RabbitEnum;
    value: string | null;
    onChange: (value: string) => void;
    label: string;
}

export default function EnumSelect({ enumType, value, onChange, label }: Props) {
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
        <Select
            label={label}
            selectedKeys={value ? [value] : []}
            onChange={(e) => onChange(e.target.value)}
            isLoading={isLoading}
        >
            {options.map((option) => (
                <SelectItem key={option} value={option}>
                    {option.replace(/_/g, ' ')}
                </SelectItem>
            ))}
        </Select>
    );
}