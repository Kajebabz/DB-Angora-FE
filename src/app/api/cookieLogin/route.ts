import { Login } from "@/services/AngoraDbService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const data = await request.json();

  const userName = data.userName;
  const password = data.password;

  const cookieStore = await cookies();

  const login = await Login(userName, password, false);

  const accessToken = login.accessToken;
  cookieStore.set('accessToken', accessToken)

  return NextResponse.json({}, { status: 200 });
}