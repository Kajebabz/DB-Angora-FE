// src/components/forms/loginForm.tsx
'use client'
import { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

interface Props {
    onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: Props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { refresh } = useAuth();

    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/cookieLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password })
            });
    
            if (response.ok) {
                toast.success('Login succesfuld');
                await refresh(); // Opdater auth state
                onSuccess?.();
                router.push('/rabbits/own');
            } else {
                const errorData = await response.json();
                toast.error(`Login fejlede: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Login fejl:', error);
            toast.error('Der skete en uventet fejl ved login');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
            <Input
                label="Brugernavn"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" color="success">
                Login
            </Button>
        </form>
    );
}