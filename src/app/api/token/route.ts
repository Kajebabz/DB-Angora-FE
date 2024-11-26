// app/api/token/route.ts - Bridge between server-side cookies and client-side requests
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
        return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    return NextResponse.json({ accessToken: accessToken.value });
}

/*
WHY THIS FILE IS NEEDED:
1. Server/Client Separation:
   - Server components can read cookies directly
   - Client components cannot access cookies directly for security
   - This route acts as a bridge

2. Request Types:
   - GET requests (like fetching profile): Cookies sent automatically
   - PUT/POST requests (like editing): Need explicit token in headers
   
3. Flow:
   Login -> Cookie stored -> 
   Need to edit? -> Get token from this endpoint -> 
   Use token in PUT request

4. Security:
   - Cookies are HttpOnly (not accessible via JavaScript)
   - This endpoint safely exposes just the token
*/