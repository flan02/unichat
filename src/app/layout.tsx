import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";

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
          <MaxWidthWrapper className="h-screen grid place-content-center">
            {children}
          </MaxWidthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
