"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import InsightCard from "@/components/ui/InsightCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { insights } from "@/lib/data/insights";
import { formatDate } from "@/lib/utils";

const categories = [
  { key: "all", value: "all" },
  { key: "stockAnalysis", value: "Stock Analysis" },
  { key: "marketOutlook", value: "Market Outlook" },
  { key: "sectorDeepDive", value: "Sector Deep Dive" },
  { key: "macroCommentary", value: "Macro Commentary" },
] as const;

export default function InsightsPage() {
  const t = useTranslations("insights");
  const locale = useLocale() as "en" | "vi";
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? insights
      : insights.filter((i) => i.category === activeCategory);

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
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "gold-gradient text-navy-900"
                    : "bg-navy-100 text-navy-600 hover:bg-navy-200"
                }`}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((insight, i) => (
              <InsightCard
                key={insight.slug}
                title={insight.title[locale]}
                excerpt={insight.excerpt[locale]}
                category={insight.category}
                date={formatDate(insight.date, locale)}
                readTime={`${insight.readTime} ${t("minuteRead")}`}
                slug={insight.slug}
                readMore={t("readMore")}
                delay={i * 0.1}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-navy-500">
              No articles found in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
