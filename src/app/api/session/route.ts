//THIRD PARTY MODULES
import { getServerSession } from "next-auth";
//HOOK
import { NextResponse } from "next/server";
import { authOptions } from "_@/server/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
