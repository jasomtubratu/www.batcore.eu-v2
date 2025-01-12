"use client";

import { HeroSection } from "@/components/sections/hero";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ServerLocation } from "@/components/sections/server-location";
import { AboutUs } from "@/components/sections/about-us";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="min-h-screen bg-gradient-to-b from-background to-blue-950 relative">
        <BackgroundAnimation />
        <div className="relative z-10">
          <HeroSection />
          <WhyChooseUs />
          <ServerLocation />
          <AboutUs />
        </div>
      </main>
    </ThemeProvider>
  );
}