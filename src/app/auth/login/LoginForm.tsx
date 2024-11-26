'use client';

import { CookieLogin } from '@/services/AuthLogin';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GiPadlock } from 'react-icons/gi';

export default function LoginForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log('HelloSubmit', userName, password);

        const success = await CookieLogin(userName, password, false);
        if (success) {
            router.push('/');
        } else {
            alert('Login fejlede, tjek dine login oplysninger');
        }
    };

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} className="text-blue-700" />
                        <h1 className="text-3xl font-semibold text-blue-700">Login</h1>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={onSubmitHandler}>
                    <div className="space-y-4">
                        <Input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            label="Email"
                            variant="bordered"
                            required
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            variant="bordered"
                            type="password"
                            required
                        />
                        <Button fullWidth color="secondary" type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
