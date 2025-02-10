"use client";
import { PackageGrid } from "@/components/minecraft/package-grid";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";
import { HeroSection } from "@/components/minecraft/hero-section";
import { useEffect, useState } from "react";

export const revalidate = 60;

export default async function MinecraftPage() {
  const [packages, setPackages] = useState([]);
  
  useEffect(() => {
    async function fetchPackages() {
      const packages = await getPackages(1);
      setPackages(packages);
    }
    fetchPackages();
  }, []);

  async function getPackages(type: number) {
    const res = await fetch('https://client.batcore.eu/api/packages', {
      next: { revalidate: 600 } 
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch packages');
    }
  
    const data = await res.json();
    return data.packages.filter((pkg: any) => pkg.service === type);
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="min-h-screen bg-gradient-to-b from-background to-blue-950 relative">
        <BackgroundAnimation />
        <div className="absolute inset-0 bg-[url('/minecraft.webp')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10">
          <HeroSection />

          <div className="py-20 px-4">
            <div className="container mx-auto">
              <PackageGrid packages={packages} />
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}