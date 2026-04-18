import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Alcainça Atlético Clube",
    template: "%s | Alcainça AC",
  },
  description:
    "Site oficial do Alcainça Atlético Clube. Fundado em 1950, promovendo o desporto em Alcainça, Mafra. Futebol e Patinagem Artística.",
  keywords: ["Alcainça", "Atlético Clube", "futebol", "patinagem artística", "Mafra", "desporto"],
  icons: { icon: "/assets/crest.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
