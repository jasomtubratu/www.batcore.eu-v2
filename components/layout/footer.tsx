"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <p className="font-bold text-2xl">{t("footer.trustpilot.title")}</p>
            <p className="font-bold text-3xl italic">
              &quot;{t("footer.trustpilot.rating")}&quot;
            </p>
            <Link href="https://www.trustpilot.com/review/batcore.eu">
              <Image
                alt="Trustpilot rating"
                src={"/trustpilot-white.webp"}
                width={210}
                height={50}
              />
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.company.title")}
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Erik Czukár</p>
              <p>IČO: 51953692.</p>
              <p>Kameničná 591</p>
              <p>946 01 Kameničná</p>
              <p>info@batcore.eu</p>
              <p>Neplátca DPH</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.links.title")}
            </h3>
            <div className="space-y-2">
              <Link
                href="/vop.pdf"
                className="block text-muted-foreground hover:text-primary"
              >
                {t("footer.links.vop")}
              </Link>
              <Link
                href="https://client.batcore.eu"
                className="block text-muted-foreground hover:text-primary"
              >
                {t("footer.links.client")}
              </Link>
              <Link
                href="https://wiki.batcore.eu"
                className="block text-muted-foreground hover:text-primary"
              >
                {t("footer.links.knowledgeBase")}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.social.title")}
            </h3>
            <div className="space-y-2">
              <Link
                href="https://discord.gg/4PeFg4a8KF"
                className="block text-muted-foreground hover:text-primary"
              >
                Discord
              </Link>
              <Link
                href="https://github.com/batcoreeu"
                className="block text-muted-foreground hover:text-primary"
              >
                Github
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} BatCore.eu {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
