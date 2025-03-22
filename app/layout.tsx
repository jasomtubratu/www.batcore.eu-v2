import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { I18nProvider } from "@/components/i18n-provider";
import AffiliateProvider from "./AffiliateProvider";
import { Suspense } from "react";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BatCore.eu",
  description: "Zažite výnimočný herný hosting s BatCore.eu. Rýchle servery, spoľahlivá dostupnosť a prvotriedna podpora.",
  keywords: "herný hosting, minecraft server, server hosting, herné servery, VPS hosting",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Suspense>
          <AffiliateProvider />
        </Suspense>


        <AuthProvider>
          <I18nProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}