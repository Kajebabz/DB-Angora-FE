// src/components/sectionNav/variants/rabbitProfileNav.tsx
'use client';
import SectionNav from '../base/sectionNav';
import { FaTrash, FaExchangeAlt } from "react-icons/fa";

interface Props {
    rabbitName: string;
    onDelete?: () => void;
    onChangeOwner?: () => void;
}

export default function RabbitProfileNav({ rabbitName, onDelete, onChangeOwner }: Props) {
    return (
        <SectionNav 
            title={`Profil: ${rabbitName}`}
            actions={[
                { 
                    label: (
                        <>
                            <FaTrash className="mr-2" />
                            Slet kanin
                        </>
                    ), 
                    onClick: () => onDelete?.(), 
                    color: "danger" 
                },
                { 
                    label: (
                        <>
                            <FaExchangeAlt className="mr-2" />
                            Skift ejer
                        </>
                    ), 
                    onClick: () => onChangeOwner?.(), 
                    color: "primary" 
                }
            ]}
        >
            {/* Fremtidig ekstra funktionalitet kan tilføjes her */}
        </SectionNav>
    );
}