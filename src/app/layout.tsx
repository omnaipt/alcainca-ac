import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alcainça Atlético Clube",
    template: "%s | Alcainça AC",
  },
  description:
    "Site oficial do Alcainça Atlético Clube. Fundado em 1950, promovendo o desporto em Alcainça, Mafra. Futebol e Patinagem Artística.",
  keywords: ["Alcainça", "Atlético Clube", "futebol", "patinagem artística", "Mafra", "desporto"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
