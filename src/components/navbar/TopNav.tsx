// src/components/navbar/TopNav.tsx
'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { GiRabbit } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginModal from '../modals/loginModal';  // Fix import path

export default function TopNav() {
    const pathname = usePathname();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isLoggedIn } = useAuth();

    return (
        <>
            <Navbar isBordered className="bg-zinc-900/70 backdrop-blur-md backdrop-saturate-150 max-w-7xl mx-auto mt-4 rounded-lg" maxWidth="xl">
                <NavbarContent justify="start">
                    <NavbarBrand>
                        <GiRabbit size={30} className="text-emerald-500 mr-2" />
                        <p className="font-bold text-inherit">DenBlå-Angora</p>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-4">
                        <NavbarItem isActive={pathname === '/rabbits/for-sale'}>
                            <Link href="/rabbits/for-sale" color={pathname === '/rabbits/for-sale' ? "success" : "foreground"}>
                                Til Salg
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive={pathname === '/rabbits/for-breeding'}>
                            <Link href="/rabbits/for-breeding" color={pathname === '/rabbits/for-breeding' ? "success" : "foreground"}>
                                Til Avl
                            </Link>
                        </NavbarItem>
                        {isLoggedIn && (
                            <NavbarItem isActive={pathname === '/rabbits/own'}>
                                <Link href="/rabbits/own" color={pathname === '/rabbits/own' ? "success" : "foreground"}>
                                    Mine Kaniner
                                </Link>
                            </NavbarItem>
                        )}
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent as="div" justify="end">
                    {isLoggedIn ? (
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="success"
                            size="sm"
                            src="/path-to-user-avatar.jpg"
                            onClick={() => window.location.href = '/rabbits/own'}
                        />
                    ) : (
                        <FaUserCircle 
                            size={32}
                            className="text-zinc-400 hover:text-zinc-200 cursor-pointer"
                            onClick={() => setIsLoginOpen(true)}
                        />
                    )}
                </NavbarContent>
            </Navbar>

            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
            />
        </>
    );
}