"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCard from "@/components/ui/StatCard";

const milestones = [
  { yearKey: "milestone1Year", titleKey: "milestone1Title", descKey: "milestone1Desc" },
  { yearKey: "milestone2Year", titleKey: "milestone2Title", descKey: "milestone2Desc" },
  { yearKey: "milestone3Year", titleKey: "milestone3Title", descKey: "milestone3Desc" },
  { yearKey: "milestone4Year", titleKey: "milestone4Title", descKey: "milestone4Desc" },
  { yearKey: "milestone5Year", titleKey: "milestone5Title", descKey: "milestone5Desc" },
  { yearKey: "milestone6Year", titleKey: "milestone6Title", descKey: "milestone6Desc" },
] as const;

const cases = ["case1", "case2", "case3"] as const;

export default function TrackRecordPage() {
  const t = useTranslations("trackRecord");

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
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading title={t("statsTitle")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label={t("yearsLabel")} value={5} suffix="+" delay={0} />
            <StatCard label={t("clientsLabel")} value={500} suffix="+" delay={0.1} />
            <StatCard label={t("portfolioLabel")} value={100} suffix="B+" delay={0.2} />
            <StatCard label={t("satisfactionLabel")} value={98} suffix="%" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-navy-50">
        <div className="container-main max-w-3xl">
          <SectionHeading title={t("timelineTitle")} />
          <div className="mt-12 relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-navy-200 md:left-1/2 md:-translate-x-0.5" />

            {milestones.map((m, i) => (
              <AnimatedSection key={m.yearKey} delay={i * 0.1}>
                <div className={`mb-10 flex items-start gap-4 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}>
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full gold-gradient font-heading text-sm font-bold text-navy-900">
                    {t(m.yearKey)}
                  </div>
                  <div className="flex-1 rounded-xl border border-navy-200 bg-white p-5 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-navy-900">
                      {t(m.titleKey)}
                    </h3>
                    <p className="mt-1 text-sm text-navy-600">{t(m.descKey)}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeading
            title={t("caseStudiesTitle")}
            subtitle={t("caseStudiesSubtitle")}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {cases.map((c, i) => (
              <AnimatedSection key={c} delay={i * 0.15}>
                <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient font-bold text-navy-900">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">
                    {t(`${c}Title` as any)}
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-navy-600">
                    <p>
                      <span className="font-semibold text-navy-700">Profile: </span>
                      {t(`${c}Profile` as any)}
                    </p>
                    <p>
                      <span className="font-semibold text-navy-700">Strategy: </span>
                      {t(`${c}Strategy` as any)}
                    </p>
                    <p className="rounded-lg bg-emerald-50 p-3 font-medium text-emerald-700">
                      {t(`${c}Result` as any)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Disclaimer */}
          <AnimatedSection>
            <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6">
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
