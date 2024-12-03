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
        <nav className="fixed left-0 top-[64px] h-[calc(100vh-64px)] w-72 bg-default-100 p-4 border-r border-divider overflow-y-auto">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="flex flex-col gap-2">
                        {actions?.map((action, index) => (
                            <Button 
                                key={index}
                                color={action.color || "primary"}
                                onClick={action.onClick}
                                className="w-full"
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </nav>
    );
}