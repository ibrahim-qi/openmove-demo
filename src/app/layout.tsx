import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Openmove - Sell Your Property Without Estate Agents",
  description: "List and sell your property directly with buyers. Save thousands on estate agent fees with Openmove's innovative peer-to-peer property platform.",
  keywords: "property sale, estate agent alternative, sell house online, property listing, direct property sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
