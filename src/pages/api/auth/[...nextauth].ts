//THIRD PARTY MODULES
import NextAuth from "next-auth";
//HOOK
import { authOptions } from "_@/server/auth";

const handler = NextAuth(authOptions);

export default handler;
