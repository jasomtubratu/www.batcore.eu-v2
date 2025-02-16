"use client";

import { HeroSection } from "@/components/sections/hero";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ServerLocations } from "@/components/sections/server-locations";
import { AboutUs } from "@/components/sections/about-us";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";
import { ServicesSection } from "@/components/sections/services";
import Lenis from 'lenis'
import { useEffect } from "react";
import { DiscordSection } from "@/components/sections/discord";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="min-h-screen bg-gradient-to-b from-background to-blue-950 relative">
        <BackgroundAnimation />
        <div className="relative z-10">
          <HeroSection />
          <AboutUs />
          <ServicesSection  />
          <ServerLocations />
          <WhyChooseUs />
          <DiscordSection />
        </div>
      </main>
    </ThemeProvider>
  );
}