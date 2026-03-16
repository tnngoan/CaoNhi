"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    key: "service1",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    key: "service2",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    key: "service3",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    key: "service4",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    key: "service5",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const tiers = [
  {
    key: "tierStarter",
    features: ["tierFeature1", "tierFeature2", "tierFeature3"],
    highlighted: false,
  },
  {
    key: "tierPro",
    features: [
      "tierFeature1",
      "tierFeature2",
      "tierFeature3",
      "tierFeature4",
      "tierFeature5",
      "tierFeature6",
    ],
    highlighted: true,
  },
  {
    key: "tierPremium",
    features: [
      "tierFeature1",
      "tierFeature2",
      "tierFeature3",
      "tierFeature4",
      "tierFeature5",
      "tierFeature6",
      "tierFeature7",
      "tierFeature8",
      "tierFeature9",
      "tierFeature10",
    ],
    highlighted: false,
  },
];

const steps = ["step1", "step2", "step3", "step4"] as const;

export default function ServicesPage() {
  const t = useTranslations("services");

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

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service.key}
                icon={service.icon}
                title={t(`${service.key}Title` as any)}
                description={t(`${service.key}Desc` as any)}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="section-padding bg-navy-50">
        <div className="container-main">
          <SectionHeading
            title={t("tiersTitle")}
            subtitle={t("tiersSubtitle")}
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.key} delay={i * 0.15}>
                <div
                  className={`relative rounded-xl border-2 p-8 ${
                    tier.highlighted
                      ? "border-gold-400 bg-white shadow-lg"
                      : "border-navy-200 bg-white"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gold-gradient px-4 py-1 text-xs font-bold text-navy-900">
                      {t("tierMostPopular")}
                    </div>
                  )}
                  <h3 className="font-heading text-2xl font-bold text-navy-900">
                    {t(tier.key as any)}
                  </h3>
                  <p className="mt-1 text-sm text-navy-500">
                    {t(`${tier.key}Desc` as any)}
                  </p>
                  <div className="mt-4 font-heading text-2xl font-bold text-gold-500">
                    {t(`${tier.key}Price` as any)}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-navy-700"
                      >
                        <svg
                          className="h-4 w-4 shrink-0 text-gold-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {t(feature as any)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 block rounded-lg py-3 text-center font-semibold transition-transform hover:scale-105 ${
                      tier.highlighted
                        ? "gold-gradient text-navy-900"
                        : "border border-navy-300 text-navy-700 hover:border-gold-400"
                    }`}
                  >
                    {tier.key === "tierStarter" ? t("getStarted") : t("contactUs")}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <SectionHeading
            title={t("processTitle")}
            subtitle={t("processSubtitle")}
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {steps.map((step, i) => (
              <AnimatedSection key={step} delay={i * 0.15}>
                <div className="flex gap-4">
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
    </>
  );
}
