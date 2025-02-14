import { PackageGrid } from "@/components/minecraft/package-grid";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";
import { HeroSection } from "@/components/minecraft/hero-section";
import { getPackages } from "@/lib/api";

export default async function MinecraftPage() {
  const packages = await getPackages(1);

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