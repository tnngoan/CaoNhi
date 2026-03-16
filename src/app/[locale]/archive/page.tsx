"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArticleCard from "@/components/ui/ArticleCard";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  articles,
  getArchiveMonths,
  categoryLabels,
} from "@/lib/data/articles";
import type { ArticleCategory } from "@/lib/data/articles";

const ITEMS_PER_PAGE = 12;

const categories: { key: ArticleCategory | "all"; label: { en: string; vi: string } }[] = [
  { key: "all", label: { en: "All", vi: "Tất cả" } },
  { key: "market-outlook", label: categoryLabels["market-outlook"] },
  { key: "stock-pick", label: categoryLabels["stock-pick"] },
  { key: "portfolio-strategy", label: categoryLabels["portfolio-strategy"] },
  { key: "sector-report", label: categoryLabels["sector-report"] },
];

const viMonths = [
  "", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];
const enMonths = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function ArchivePage() {
  const t = useTranslations("archive");
  const locale = useLocale() as "en" | "vi";

  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showMonthPanel, setShowMonthPanel] = useState(false);

  const archiveMonths = useMemo(() => getArchiveMonths(), []);

  const filtered = useMemo(() => {
    let result = articles;

    if (activeCategory !== "all") {
      result = result.filter((a) => a.category === activeCategory);
    }

    if (selectedMonth !== "all") {
      result = result.filter((a) => a.publishDate.startsWith(selectedMonth));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          a.relatedStocks.some((s) => s.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, selectedMonth, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Group months by year for sidebar
  const monthsByYear = useMemo(() => {
    const map = new Map<number, typeof archiveMonths>();
    for (const m of archiveMonths) {
      if (!map.has(m.year)) map.set(m.year, []);
      map.get(m.year)!.push(m);
    }
    return map;
  }, [archiveMonths]);

  const resetFilters = () => {
    setActiveCategory("all");
    setSelectedMonth("all");
    setSearchQuery("");
    setPage(1);
  };

  return (
    <>
      {/* Hero */}
      <section className="navy-gradient pt-32 pb-20">
        <div className="container-main text-center">
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full gold-gradient" />
          <p className="mt-6 text-lg text-navy-300">{t("subtitle")}</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-navy-400">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              {articles.length} {t("totalArticles")}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {t("since")} 03/2023
            </span>
          </div>
        </div>
      </section>

      {/* Filters + Content */}
      <section className="section-padding">
        <div className="container-main">
          {/* Search bar */}
          <div className="relative mx-auto max-w-2xl">
            <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-xl border border-navy-200 bg-white py-3 pl-12 pr-4 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
            />
          </div>

          {/* Category tabs */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 sm:mt-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setPage(1);
                }}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  activeCategory === cat.key
                    ? "gold-gradient text-navy-900"
                    : "bg-navy-100 text-navy-600 hover:bg-navy-200"
                }`}
              >
                {cat.label[locale]}
              </button>
            ))}

            {/* Month filter toggle */}
            <button
              onClick={() => setShowMonthPanel(!showMonthPanel)}
              className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                selectedMonth !== "all"
                  ? "gold-gradient text-navy-900"
                  : "bg-navy-100 text-navy-600 hover:bg-navy-200"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {selectedMonth !== "all"
                ? `${(locale === "vi" ? viMonths : enMonths)[parseInt(selectedMonth.slice(5))]} ${selectedMonth.slice(0, 4)}`
                : t("filterByMonth")}
            </button>
          </div>

          {/* Month filter panel */}
          <AnimatePresence>
            {showMonthPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mx-auto mt-4 max-w-4xl rounded-xl border border-navy-200 bg-navy-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-navy-700">{t("archiveByMonth")}</h3>
                    {selectedMonth !== "all" && (
                      <button
                        onClick={() => { setSelectedMonth("all"); setPage(1); }}
                        className="text-xs text-gold-500 hover:text-gold-600"
                      >
                        {t("clearFilter")}
                      </button>
                    )}
                  </div>
                  {Array.from(monthsByYear.entries()).map(([year, months]) => (
                    <div key={year} className="mt-2">
                      <h4 className="text-xs font-bold text-navy-500">{year}</h4>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {months.map((m) => {
                          const key = `${m.year}-${String(m.month).padStart(2, "0")}`;
                          return (
                            <button
                              key={key}
                              onClick={() => {
                                setSelectedMonth(key === selectedMonth ? "all" : key);
                                setPage(1);
                              }}
                              className={`rounded-md px-2 py-1 text-xs transition-colors ${
                                selectedMonth === key
                                  ? "gold-gradient text-navy-900 font-bold"
                                  : "bg-white text-navy-600 hover:bg-navy-100"
                              }`}
                            >
                              {(locale === "vi" ? viMonths : enMonths)[m.month]} ({m.count})
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results info */}
          <div className="mt-6 flex items-center justify-between text-sm text-navy-500">
            <span>
              {filtered.length} {t("articlesFound")}
              {activeCategory !== "all" || selectedMonth !== "all" || searchQuery ? (
                <button onClick={resetFilters} className="ml-2 text-gold-500 hover:text-gold-600">
                  {t("resetAll")}
                </button>
              ) : null}
            </span>
            <span>
              {t("page")} {page}/{totalPages || 1}
            </span>
          </div>

          {/* Article grid */}
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((article, i) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={article.summary}
                category={article.category}
                publishDate={article.publishDate}
                readTime={article.readTime}
                slug={article.slug}
                views={article.views}
                likes={article.likes}
                tags={article.tags}
                relatedStocks={article.relatedStocks}
                locale={locale}
                delay={i * 0.05}
              />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-navy-500">{t("noResults")}</p>
              <button onClick={resetFilters} className="mt-2 text-sm text-gold-500 hover:text-gold-600">
                {t("resetAll")}
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-600 transition-colors hover:border-gold-400 disabled:opacity-40"
              >
                ←
              </button>
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (page <= 4) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = page - 3 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      page === pageNum
                        ? "gold-gradient text-navy-900"
                        : "border border-navy-200 text-navy-600 hover:border-gold-400"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-600 transition-colors hover:border-gold-400 disabled:opacity-40"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
