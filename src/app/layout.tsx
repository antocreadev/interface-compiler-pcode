import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pcode Machine - Compiler",
  description: "Pcode Machine - Compiler by Anthony Menghi alias antocreadev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
