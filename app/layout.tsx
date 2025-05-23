import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LevelUp from "./components/LevelUp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlanPie",
  description: "Refuse to be overwhelmed by cumbersome affairs. Lightweight tools, intelligent planning, and a companion experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundImage: 'url(/ruben-mavarez-uxtHSKGPBQM-unsplash.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        {children}
        <div className="w-full absolute flex justify-center items-center bottom-1">
          <div className="text-gray-900 flex justify-center items-center flex-col">
        <Link href="/terms-of-service" className="hover:underline hover:text-black">Terms of Service</Link>
        <p></p>
        <Link href="/privacy-policy" className="hover:underline hover:text-black">Privacy Policy</Link>
        <LevelUp></LevelUp>
        <Link href="/" className="hover:underline hover:text-black">Home</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
