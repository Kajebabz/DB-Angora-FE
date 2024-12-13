// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Login } from '@/services/AngoraDbService';

export async function POST(request: NextRequest) {
    try {
        const { userName, password } = await request.json();
        const loginResponse = await Login(userName, password);

        if (!loginResponse?.accessToken) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const response = NextResponse.json({ success: true });
        response.cookies.set('accessToken', loginResponse.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}