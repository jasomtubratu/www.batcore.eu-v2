"use client";

import { usePackages } from "@/hooks/use-packages";
import { PackageGrid } from "@/components/minecraft/package-grid";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";

export default function MinecraftPage() {
  const { packages, isLoading, error } = usePackages();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="min-h-screen bg-gradient-to-b from-background to-blue-950 relative">
        <BackgroundAnimation />
        <div className="relative z-10 py-20 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Minecraft
            </h1>
            <PackageGrid packages={packages} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}