"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const sectors = [
  { key: "sectorBanking", color: "bg-blue-100 text-blue-700" },
  { key: "sectorRealEstate", color: "bg-emerald-100 text-emerald-700" },
  { key: "sectorIndustrial", color: "bg-amber-100 text-amber-700" },
  { key: "sectorConsumer", color: "bg-rose-100 text-rose-700" },
  { key: "sectorTech", color: "bg-purple-100 text-purple-700" },
  { key: "sectorEnergy", color: "bg-cyan-100 text-cyan-700" },
] as const;

const timeline = [
  { year: "2021", icon: "🎯" },
  { year: "2022", icon: "🏆" },
  { year: "2023", icon: "📈" },
  { year: "2024", icon: "🔬" },
  { year: "2025", icon: "💎" },
  { year: "2026", icon: "🚀" },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="navy-gradient pt-32 pb-20">
        <div className="container-main">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
                {t("title")}
              </h1>
              <div className="mt-4 h-1 w-16 rounded-full gold-gradient" />
              <p className="mt-6 text-lg text-navy-300">{t("subtitle")}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="flex justify-center">
                <div className="relative h-80 w-80 overflow-hidden rounded-2xl border-2 border-gold-500/30">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Cao Nhi"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <SectionHeading title={t("storyTitle")} />
          <div className="mt-12 space-y-6 text-base leading-relaxed text-navy-700">
            <AnimatedSection>
              <p>{t("story1")}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p>{t("story2")}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p>{t("story3")}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-navy-50">
        <div className="container-main max-w-4xl">
          <SectionHeading title={t("philosophyTitle")} />
          <AnimatedSection>
            <p className="mt-8 text-center text-base leading-relaxed text-navy-700">
              {t("philosophyDesc")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Education */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <SectionHeading title={t("educationTitle")} />
          <div className="mt-12 space-y-4">
            {(["education1", "education2", "education3", "education4"] as const).map(
              (key, i) => (
                <AnimatedSection key={key} delay={i * 0.1}>
                  <div className="flex items-start gap-4 rounded-lg border border-navy-200 bg-white p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-navy-700">{t(key)}</p>
                  </div>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* Sector Expertise */}
      <section className="section-padding bg-navy-50">
        <div className="container-main">
          <SectionHeading title={t("sectorTitle")} />
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {sectors.map((sector, i) => (
              <AnimatedSection key={sector.key} delay={i * 0.05}>
                <span
                  className={`rounded-full px-6 py-3 text-sm font-semibold ${sector.color}`}
                >
                  {t(sector.key)}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding navy-gradient">
        <div className="container-main text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-300">{t("ctaDesc")}</p>
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
