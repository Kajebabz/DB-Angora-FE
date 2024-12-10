// src/app/api/auth/login/route.ts 
import { Login } from "@/services/AngoraDbService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { userName, password } = data;
        
        console.log('Login attempt for:', userName);

        const loginResponse = await Login(userName, password, false);
        
        // Add response debugging
        console.log('Backend login response:', loginResponse);

        if (!loginResponse?.accessToken) {
            return NextResponse.json(
                { error: 'Invalid credentials' }, 
                { status: 401 }
            );
        }

        const response = NextResponse.json({ success: true });
        
        response.cookies.set('accessToken', loginResponse.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'  // Add explicit path
        });

        return response;
    } catch (error) {
        console.error('Login route error:', error);
        return NextResponse.json(
            { error: 'Server error' }, 
            { status: 500 }
        );
    }
}