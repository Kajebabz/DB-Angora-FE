// src/components/navbar/TopNav.tsx
'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link as NextUILink } from "@nextui-org/react";
import Link from "next/link";
import { GiRabbit } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginModal from '../modals/loginModal';

export default function TopNav() {
    const pathname = usePathname();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isLoggedIn, logout, refresh } = useAuth();

    useEffect(() => {
        refresh();
    }, [pathname, refresh]);

    useEffect(() => {
        if (isLoggedIn) {
            setIsLoginOpen(false);
        }
    }, [isLoggedIn]);

    return (
        <>
            <Navbar isBordered className="bg-zinc-900/70 backdrop-blur-md backdrop-saturate-150 max-w-7xl mx-auto mt-4 rounded-lg" maxWidth="xl">
                <NavbarContent justify="start">
                    <NavbarBrand>
                        <Link href="/" passHref legacyBehavior>
                            <NextUILink className="flex items-center gap-2">
                                <GiRabbit size={30} className="text-emerald-500" />
                                <p className="font-bold">DenBlå-Angora</p>
                            </NextUILink>
                        </Link>
                    </NavbarBrand>
                    
                    <NavbarContent className="hidden sm:flex gap-4">
                        <NavbarItem isActive={pathname === '/rabbits/for-sale'}>
                            <Link href="/rabbits/for-sale" passHref legacyBehavior>
                                <NextUILink color={pathname === '/rabbits/for-sale' ? "success" : "foreground"}>
                                    Til Salg
                                </NextUILink>
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive={pathname === '/rabbits/for-breeding'}>
                            <Link href="/rabbits/for-breeding" passHref legacyBehavior>
                                <NextUILink color={pathname === '/rabbits/for-breeding' ? "success" : "foreground"}>
                                    Til Avl
                                </NextUILink>
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent as="div" justify="end">
                    {isLoggedIn ? (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="success"
                                    size="sm"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profil handlinger">
                                <DropdownItem key="rabbits" href="/rabbits/own">
                                    Mine Kaniner
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" onClick={logout}>
                                    Log ud
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsLoginOpen(true)}>
                            <span className="text-zinc-400 hover:text-zinc-200">Login</span>
                            <FaUserCircle
                                size={32}
                                className="text-zinc-400 hover:text-zinc-200"
                            />
                        </div>
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