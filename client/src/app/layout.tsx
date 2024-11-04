import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Header } from '../components';
import Providers from "@/utils/Providers";

const uolFont = localFont({
  src: "./fonts/uol-text-regular.woff",
  variable: "--font-uol-sans",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "Painel de clientes | UOL - Seu universo online",
  description: "Crie e administre seus clientes na UOL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-theme="light">
      <body
        className={`${uolFont.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
