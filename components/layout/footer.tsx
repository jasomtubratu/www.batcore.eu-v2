"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.company")}</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>BatCore s.r.o.</p>
              <p>VAT: CZ12345678</p>
              <p>Prague, Czech Republic</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>support@batcore.eu</p>
              <p>+420 123 456 789</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.links")}</h3>
            <div className="space-y-2">
              <Link href="/terms" className="block text-muted-foreground hover:text-primary">
                {t("footer.terms")}
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary">
                {t("footer.privacy")}
              </Link>
              <Link href="/gdpr" className="block text-muted-foreground hover:text-primary">
                {t("footer.gdpr")}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.social")}</h3>
            <div className="space-y-2">
              <Link href="https://discord.gg/batcore" className="block text-muted-foreground hover:text-primary">
                Discord
              </Link>
              <Link href="https://twitter.com/batcoreeu" className="block text-muted-foreground hover:text-primary">
                Twitter
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BatCore s.r.o. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}