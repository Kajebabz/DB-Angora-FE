// src/components/navbar/TopNav.tsx
'use client'
import { 
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    Link, 
    Avatar 
} from "@nextui-org/react";
import { GiRabbit } from "react-icons/gi";
import { usePathname } from 'next/navigation';

export default function TopNav() {
    const pathname = usePathname();

    return (
        <Navbar 
            isBordered 
            className="bg-zinc-900/70 backdrop-blur-md backdrop-saturate-150 max-w-7xl mx-auto mt-4 rounded-lg"
            maxWidth="xl"
        >
            <NavbarContent justify="start">
                <NavbarBrand>
                    <GiRabbit size={30} className="text-emerald-500 mr-2"/>
                    <p className="font-bold text-inherit">DenBlå-Angora</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4">
                    <NavbarItem isActive={pathname === '/rabbits/for-sale'}>
                        <Link 
                            href="/rabbits/for-sale" 
                            color={pathname === '/rabbits/for-sale' ? "success" : "foreground"}
                        >
                            Til Salg
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive={pathname === '/rabbits/own'}>
                        <Link 
                            href="/rabbits/own" 
                            color={pathname === '/rabbits/own' ? "success" : "foreground"}
                        >
                            Mine Kaniner
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="success"
                    size="sm"
                    src="https://i.pravatar.cc/150"
                    onClick={() => window.location.href = '/auth/login'}
                />
            </NavbarContent>
        </Navbar>
    );
}