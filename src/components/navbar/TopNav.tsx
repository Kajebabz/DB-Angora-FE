// src>components>navbar>TopNav.tsx
'use client'

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GiRabbit } from 'react-icons/gi'

export default function TopNav() {
    return (
        <Navbar
            maxWidth='xl'
            className='bg-gradient-to-r from-green-200 to-green-600'
            classNames={{
                item: [
                    'text-xl',
                    'text-white',
                    'uppercase'
                ]
            }}
        >
            <NavbarBrand as={Link} href='/'>
                <GiRabbit size={40} className='text-blue-700 mr-2'/>
                <div className='font-bold text-3xl flex'>
                    <span className='text-blue-700 mr-2'>DenBlå</span>
                    <span className='text-blue-700'>Angora</span>
                </div>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem as={Link} href='/rabbits/for-sale'>Salg</NavbarItem>
                <NavbarItem as={Link} href='/rabbits/for-breeding'>Breeding</NavbarItem>
                <NavbarItem as={Link} href='/rabbits/own'>Egne</NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <Button as={Link} href='/auth/login' variant='bordered' className='text-white'>Login</Button>
            </NavbarContent>
        </Navbar>
    )
}
