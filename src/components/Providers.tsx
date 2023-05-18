"use client";
//THIRD PARTY MODULES
import { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

function useSessionToLocalStorage() {
  const session = useSession() as any;

  useEffect(() => {
    localStorage.setItem("accessToken", session?.data?.user?.accessToken);
  }, [session]);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
    },
  },
});

const Main = ({ children }) => {
  useSessionToLocalStorage();

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Main>{children}</Main>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Providers;
