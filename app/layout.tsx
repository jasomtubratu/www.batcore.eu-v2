import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { I18nProvider } from "@/components/i18n-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BatCore.eu",
  description: "Zažite skvelý herný zážitok s našimi Minecraft servermi. Ponúkame kvalitné herné servery s nízkou latenciou a 24/7 podporou.",
  keywords: "game hosting, minecraft server, server hosting, gaming servers, cz hosting, cz minecraft server, cz minecraft hosting, sk hosting, sk minecraft server, sk minecraft hosting, eu hosting, eu minecraft server, eu minecraft hosting, sk cz, cz/sk, batcore.eu, batcore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}