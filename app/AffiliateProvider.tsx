"use client";

import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AffiliateProvider() {
  const seachParams = useSearchParams();
  const af = seachParams.get("af");

  useEffect(() => {
    if (af) {
      Cookies.set("AFF_ID", af, {
        expires: 1,
        domain: ".batcore.eu",
      });

      const newUrl = new URL(window.location.href);

      newUrl.searchParams.delete("af");
      window.history.replaceState({}, document.title, newUrl.toString());
    }

  }, [af]);

  return <></>;
}
