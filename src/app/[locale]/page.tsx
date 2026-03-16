"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";
import InsightCard from "@/components/ui/InsightCard";
import { insights } from "@/lib/data/insights";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale() as "en" | "vi";
  const latestInsights = insights.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden navy-gradient">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gold-400 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <div className="container-main relative flex min-h-screen items-center pt-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5">
                <span className="text-sm font-medium text-gold-400">
                  MB Securities (MBS) · 5+ Years
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-6 max-w-xl text-base text-navy-300 md:text-lg">
                {t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block rounded-lg gold-gradient px-6 py-3 text-base font-semibold text-navy-900 transition-transform hover:scale-105"
                >
                  {t("bookConsultation")}
                </Link>
                <Link
                  href="/insights"
                  className="inline-block rounded-lg border border-navy-400 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-400"
                >
                  {t("viewInsights")}
                </Link>
              </div>
            </motion.div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl gold-gradient opacity-20 blur-xl" />
                <div className="relative h-[28rem] w-80 overflow-hidden rounded-2xl border-2 border-gold-500/30 sm:h-[32rem] sm:w-96">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Cao Nhi - Stock Broker at MBS"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <svg
            className="h-6 w-6 text-navy-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10">
        <div className="container-main">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <StatCard value={5} label={t("statsYears")} delay={0} />
            <StatCard value={500} label={t("statsClients")} delay={0.1} />
            <StatCard
              value={2000}
              suffix="B+"
              label={t("statsPortfolio")}
              delay={0.2}
            />
            <StatCard value={50} label={t("statsReports")} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Investment Approach */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            title={t("approachTitle")}
            subtitle={t("approachSubtitle")}
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: t("approach1Title"),
                desc: t("approach1Desc"),
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: t("approach2Title"),
                desc: t("approach2Desc"),
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: t("approach3Title"),
                desc: t("approach3Desc"),
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="rounded-xl border border-navy-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 text-gold-500">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="section-padding bg-navy-50">
        <div className="container-main">
          <SectionHeading
            title={t("insightsTitle")}
            subtitle={t("insightsSubtitle")}
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestInsights.map((insight, i) => (
              <InsightCard
                key={insight.slug}
                title={insight.title[locale]}
                excerpt={insight.excerpt[locale]}
                category={insight.category}
                date={formatDate(insight.date, locale)}
                readTime={`${insight.readTime} ${t("readMore").includes("Đọc") ? "phút đọc" : "min read"}`}
                slug={insight.slug}
                readMore={t("readMore")}
                delay={i * 0.1}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-300 px-6 py-3 font-semibold text-navy-700 transition-colors hover:border-gold-400 hover:text-gold-600"
            >
              {t("viewAll")}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding navy-gradient">
        <div className="container-main text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-navy-300 md:text-lg">
              {t("ctaSubtitle")}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg gold-gradient px-8 py-4 text-lg font-semibold text-navy-900 transition-transform hover:scale-105"
            >
              {t("bookConsultation")}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
