import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";
import ThemeProvider from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "unichat | Inicio",
  description: "A modern messaging app rare like a unicorn.",
  authors: {
    name: "Dan Chanivet",
    url: "https://www.danchanivet.tech",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <MaxWidthWrapper className="h-screen flex justify-center items-center !px-0 min-w-full bg-rose-200/30">
              {children}
            </MaxWidthWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
