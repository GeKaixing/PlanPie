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
      <head>
        <meta name="google-site-verification" content="J4NJPtZuJi3XSWFkuCWPAfANYe0cc0RBLMkQ7HZPhYk" />
        <script async type="module" src='/cookieconsent-config.js'></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css"></link>
      </head>
      <script type="text/javascript">
        {`
       (function(c,l,a,r,i,t,y){
          c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rthiq9rvo6");
      `}

      </script>
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
