"use client";

import { motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import { t } from "i18next";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";
import { Tally1, Tally2, Tally3, Tally4 } from "lucide-react";

export default function CreditPage() {
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

  const steps = [
    {
      number: <Tally1 size={24} />,
      title: t("credits.affiliate.steps.register.title"),
      description: t("credits.affiliate.steps.register.description"),
    },
    {
      number: <Tally2 size={24} />,
      title: t("credits.affiliate.steps.share.title"),
      description: t("credits.affiliate.steps.share.description"),
    },
    {
      number: <Tally3 size={24} />,
      title: t("credits.affiliate.steps.earn.title"),
      description: t("credits.affiliate.steps.earn.description"),
    },
    {
      number: <Tally4 size={24} />,
      title: t("credits.affiliate.steps.withdraw.title"),
      description: t("credits.affiliate.steps.withdraw.description"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BackgroundAnimation />
      <motion.section
        animate="visible"
        className="w-full py-6 md:py-24 lg:py-32 xl:py-24 relative rounded-2xl"
        initial="hidden"
        variants={containerVariants}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 hidden sm:block"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {t("credits.hero.title")}
          </h2>
          <p className="max-w-[900px] text-zinc-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            <p> {t("credits.hero.description")} </p>
            </p>
        </motion.div>
      </motion.section>

      <Separator className="my-8" />

      <motion.section
        animate="visible"
        className="w-full py-24"
        initial="hidden"
        variants={containerVariants}
      >
        <div className="px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("credits.affiliate.title")}
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {t("credits.affiliate.description")}
            </p>
          </motion.div>
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12"
            variants={containerVariants}
          >
            {steps.map((step: any) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center space-y-2 text-center"
                variants={itemVariants}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full ">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Separator className="my-3" />

      <motion.section
        animate="visible"
        className="w-full py-12"
        initial="hidden"
        variants={containerVariants}
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            variants={containerVariants}
          >
            <motion.div
              className="flex flex-col justify-center space-y-4"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("credits.testing.title")}
                </h2>
                <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  {t("credits.testing.description")}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {t("credits.testing.code")}
                  </span>
                  <Badge>TESTING</Badge>
                </div>
              </div>
              <span className="text-gray-500 text-sm italic">
                {t("credits.testing.notice")}
              </span>
            </motion.div>
            <motion.div
              className="flex justify-center lg:justify-end"
              variants={itemVariants}
            >
              <Image
                alt="Testing"
                className="object-cover object-center"
                height="400"
                src="/testing.svg"
                width="600"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Separator className="my-3" />

      <motion.section
        animate="visible"
        className="w-full py-8 relative"
        initial="hidden"
        variants={containerVariants}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/discord.png"
            alt="Discord background"
            fill
            className="object-cover opacity-30 blur-sm"
          />
        </div>
        <div className="px-4 md:px-6 relative z-10">
          <motion.div
        className="flex flex-col items-center justify-center space-y-4 text-center"
        variants={itemVariants}
          > 
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {t("credits.discord.title")}
        </h2>
        <p className="max-w-[900px] text-zinc-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {t("credits.discord.description")}
        </p>
        <Link href="https://discord.gg/4PeFg4a8KF">
          <Button color="secondary" size="lg">
            {t("credits.discord.button")}
          </Button>
        </Link>
          </motion.div>
        </div>
      </motion.section>
    </ThemeProvider>
  );
}