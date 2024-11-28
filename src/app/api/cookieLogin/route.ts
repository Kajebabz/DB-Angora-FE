import { Login } from "@/services/AngoraDbService";
//import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
      const data = await request.json();
      const { userName, password } = data;

      const login = await Login(userName, password, false);
      
      if (!login.accessToken) {
          return NextResponse.json({ error: 'Login failed' }, { status: 401 });
      }

      // Sæt cookie
      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.set('accessToken', login.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
      });

      return response;
  } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}