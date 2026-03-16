"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const pillars = [
  {
    key: "pillar1",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: "pillar2",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: "pillar3",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: "pillar4",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
];

const processSteps = ["process1", "process2", "process3", "process4", "process5"] as const;
const comparisons = ["comp1", "comp2", "comp3", "comp4", "comp5"] as const;

export default function PhilosophyPage() {
  const t = useTranslations("philosophy");

  return (
    <>
      {/* Hero */}
      <section className="navy-gradient pt-32 pb-20">
        <div className="container-main max-w-4xl text-center">
          <AnimatedSection>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              {t("title")}
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full gold-gradient" />
            <p className="mt-6 text-lg text-navy-300">{t("subtitle")}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <blockquote className="mt-12 rounded-xl border border-navy-700 bg-navy-800/50 p-8">
              <p className="font-heading text-xl text-gold-400 italic md:text-2xl">
                &ldquo;{t("heroQuote")}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-navy-400">
                — {t("heroAuthor")}
              </footer>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-8 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <AnimatedSection key={pillar.key} delay={i * 0.1}>
                <div className="rounded-xl border border-navy-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-navy-50 text-gold-500">
                    {pillar.icon}
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-navy-900">
                    {t(`${pillar.key}Title` as any)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {t(`${pillar.key}Desc` as any)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-navy-50">
        <div className="container-main max-w-4xl">
          <SectionHeading
            title={t("processTitle")}
            subtitle={t("processSubtitle")}
          />
          <div className="mt-16 space-y-6">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step} delay={i * 0.1}>
                <div className="flex gap-6 rounded-xl border border-navy-200 bg-white p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gold-gradient font-heading text-lg font-bold text-navy-900">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy-900">
                      {t(step)}
                    </h3>
                    <p className="mt-1 text-sm text-navy-600">
                      {t(`${step}Desc` as any)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <SectionHeading title={t("comparisonTitle")} />
          <AnimatedSection>
            <div className="mt-12 overflow-hidden rounded-xl border border-navy-200">
              <div className="grid grid-cols-2">
                <div className="bg-navy-900 p-4 text-center font-heading text-sm font-bold text-white">
                  {t("comparisonOur")}
                </div>
                <div className="bg-navy-200 p-4 text-center font-heading text-sm font-bold text-navy-700">
                  {t("comparisonSpec")}
                </div>
              </div>
              {comparisons.map((comp, i) => (
                <div
                  key={comp}
                  className={`grid grid-cols-2 ${
                    i % 2 === 0 ? "bg-white" : "bg-navy-50"
                  }`}
                >
                  <div className="border-r border-navy-200 p-4 text-sm font-medium text-navy-800">
                    ✅ {t(`${comp}Our` as any)}
                  </div>
                  <div className="p-4 text-sm text-navy-500">
                    ❌ {t(`${comp}Spec` as any)}
                  </div>
                </div>
              ))}
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
            <Link
              href="/services"
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
