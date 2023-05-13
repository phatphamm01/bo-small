import NextAuth from "next-auth";
import { authOptions } from "_@/server/auth";

export default NextAuth(authOptions);
