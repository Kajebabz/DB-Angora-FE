// src/components/sectionNav/base/sectionNav.tsx
'use client';
import { Button } from "@nextui-org/react";

interface NavAction {
    label: string;
    onClick: () => void;
    color?: "primary" | "secondary" | "success" | "warning" | "danger";
}

interface SectionNavProps {
    title: string;
    actions?: NavAction[];
    children?: React.ReactNode;
}

export default function SectionNav({ title, actions = [], children }: SectionNavProps) {
    return (
        <nav className="w-full bg-default-100 p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex gap-2">
                    {actions?.map((action, index) => (
                        <Button 
                            key={index}
                            color={action.color || "primary"}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>
            {children}
        </nav>
    );
}