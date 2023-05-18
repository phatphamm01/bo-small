//THIRD PARTY MODULES
import { BASE_PATH } from "_@/swagger/api";
import { type GetServerSidePropsContext } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameOrEmail: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${BASE_PATH}/api/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            usernameOrEmail: credentials?.usernameOrEmail,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: "IamVeryHandsome",
  callbacks: {
    async jwt({ token, account, user }) {
      token = { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      const res = await fetch(`${BASE_PATH}/api/user/me`, {
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      const { data } = await res.json();

      const username = data.username || token.name;

      const user = await fetch(`${BASE_PATH}/api/user/${username}`, {
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }).then((res) => res.json());

      session.user = {
        ...session.user,
        ...user.data,
        ...token,
      };
      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
