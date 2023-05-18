//THIRD PARTY MODULES
import { getServerSession } from "next-auth";
//HOOK
import { authOptions } from "_@/server/auth";

export const isomorphicFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const accessToken =
    typeof window !== "undefined"
      ? getClientSession()
      : (async () => {
          const session = (await getServerSession(authOptions)) as any;
          return session?.user?.accessToken;
        })();

  const token = await accessToken;
  console.log({ token });

  if (typeof window !== "undefined" && !token) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  }

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      //cookie ""
      Authorization: "Bearer " + token,
    },
  });
};

const getClientSession = async () => {
  if (typeof window === "undefined") return;
  const session = localStorage.getItem("accessToken");

  if (!session) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return getClientSession();
  }
  return session;
};
