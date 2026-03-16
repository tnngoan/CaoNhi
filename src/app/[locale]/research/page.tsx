"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import StockCard from "@/components/ui/StockCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { stocks } from "@/lib/data/stocks";

const sectorFilters = [
  { key: "allSectors", value: "all" },
  { key: "banking", value: "banking" },
  { key: "realEstate", value: "realEstate" },
  { key: "technology", value: "technology" },
  { key: "industrial", value: "industrial" },
  { key: "consumer", value: "consumer" },
] as const;

export default function ResearchPage() {
  const t = useTranslations("research");
  const locale = useLocale() as "en" | "vi";
  const [activeSector, setActiveSector] = useState("all");

  const filtered =
    activeSector === "all"
      ? stocks
      : stocks.filter((s) => s.sectorKey === activeSector);

  return (
    <>
      <section className="navy-gradient pt-32 pb-20">
        <div className="container-main text-center">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full gold-gradient" />
          <p className="mt-6 text-lg text-navy-300">{t("subtitle")}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-2">
            {sectorFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveSector(f.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeSector === f.value
                    ? "gold-gradient text-navy-900"
                    : "bg-navy-100 text-navy-600 hover:bg-navy-200"
                }`}
              >
                {t(f.key)}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((stock, i) => (
              <StockCard
                key={stock.ticker}
                company={stock.company}
                ticker={stock.ticker}
                sector={stock.sector}
                sectorColor={stock.sectorColor}
                thesis={stock.thesis[locale]}
                risks={stock.risks[locale]}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Disclaimer */}
          <AnimatedSection>
            <div className="mt-16 rounded-xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm text-amber-800">{t("disclaimer")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding navy-gradient">
        <div className="container-main text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-300">
              {t("ctaDesc")}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg gold-gradient px-8 py-4 text-lg font-semibold text-navy-900 transition-transform hover:scale-105"
            >
              {t("ctaTitle")}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
