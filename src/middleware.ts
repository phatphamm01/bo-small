//THIRD PARTY MODULES
import { env } from "_@/env.mjs";
import { withAuth } from "next-auth/middleware";
import { decode, GetTokenParams, JWT } from "next-auth/jwt";
//HOOK
import { NextResponse } from "next/server";

const auth = ["/login", "/forgot"];
const api = ["/api", "/images", "/fonts"];

export async function getToken<R extends boolean = false>(
  params: GetTokenParams<R>
): Promise<R extends true ? string : JWT | null> {
  const {
    req,
    raw,
    decode: _decode = decode,
    secret = process.env.NEXTAUTH_SECRET,
  } = params;

  if (!req) throw new Error("Must pass `req` to JWT getToken()");

  const data = req.cookies
    .toString()
    .split(" ")
    .reduce((pre, cur) => {
      const [longKey = "", val] = cur.split("=");
      const [, key] = longKey?.split(".");
      if (!key) {
        return pre;
      }
      return { ...pre, [key]: val };
    }, {} as Record<string, string | undefined>);

  let token = data["session-token"];

  const authorizationHeader =
    req.headers instanceof Headers
      ? req.headers.get("authorization")
      : req.headers?.authorization;

  if (!token && authorizationHeader?.split(" ")[0] === "Bearer") {
    const urlEncodedToken = authorizationHeader.split(" ")[1];
    if (urlEncodedToken) {
      token = decodeURIComponent(urlEncodedToken);
    }
  }

  // @ts-expect-error
  if (!token) return null;

  // @ts-expect-error
  if (raw) return token;

  try {
    // @ts-expect-error
    return await _decode({ token, secret });
  } catch {
    // @ts-expect-error
    return null;
  }
}

export default withAuth(
  async function middleware(req) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);
    const tokenRaw = await getToken({ req, raw: true });
    const token = await decode({
      token: tokenRaw,
      secret: env.NEXTAUTH_SECRET || "",
    });

    const isAuth = !!token;
    const isAuthPage = Boolean(
      auth.find((path) => req.nextUrl.pathname.startsWith(path))
    );
    const isApi = Boolean(
      api.find((path) => req.nextUrl.pathname.startsWith(path))
    );

    if (isApi) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url).toString(), {
          headers: requestHeaders,
        });
      }

      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(new URL(`/login?from=${from}`, req.url), {
        headers: requestHeaders,
      });
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: async () => {
        return true;
      },
    },
  }
);
