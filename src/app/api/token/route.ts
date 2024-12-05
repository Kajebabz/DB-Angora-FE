// app/api/token/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function HEAD() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    // Always return 200 for HEAD requests, with different headers
    return new NextResponse(null, { 
        status: 200,
        headers: {
            'X-Is-Authenticated': accessToken ? 'true' : 'false'
        }
    });
}

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
        return NextResponse.json(
            { error: 'No access token found' }, 
            { status: 401 }
        );
    }

    return NextResponse.json({ accessToken: accessToken.value });
}

/*
WHY THIS FILE IS NEEDED:
1. Auth Status Check:
   - HEAD request returnerer altid 200 med X-Is-Authenticated header
   - Bruges til UI state (vis/skjul login knap, beskyttede routes)
   - Undgår unødvendige 401 fejl i konsollen

2. Token Access:
   - GET request til actual token hentning
   - Returnerer 401 hvis ingen token
   - Bruges når vi skal lave authenticated API kald

3. Flow:
   - UI checker auth status via HEAD
   - Protected routes henter token via GET
   - Sikker håndtering af HttpOnly cookies

4. Security:
   - HEAD afslører kun login status, ikke token
   - GET beskytter token bag 401
   - Adskiller auth check fra token access
*/