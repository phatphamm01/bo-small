//THIRD PARTY MODULES
import "_@/styles/globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
//LAYOUT, COMPONENTS
import Providers from "_@/components/Providers";

const outfit = Inter({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <head>
        <title>Small newspaper for small towns - The Small Town Times</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="The Small Town Times is a small newspaper for small towns. We cover local news, sports, and events."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="overflow-hidden">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
