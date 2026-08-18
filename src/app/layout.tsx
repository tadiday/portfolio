import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});


export const metadata: Metadata = {
  title: "Peter Cao - Software Engineer",
  description:
    "Peter Cao - An upcoming software engineer passionate about building scalable software, solving complex problems, and creating innovative solutions. Available for hire May 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-screen bg-home" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/assets/logo/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <SmoothScroll />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
