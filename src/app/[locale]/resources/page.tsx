"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const guides = ["guide1", "guide2", "guide3", "guide4"] as const;
const faqs = ["faq1", "faq2", "faq3", "faq4", "faq5"] as const;
const downloads = ["download1", "download2", "download3"] as const;

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* Guides */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((g, i) => (
              <AnimatedSection key={g} delay={i * 0.1}>
                <div className="rounded-xl border border-navy-200 bg-white p-6 shadow-sm transition-all hover:border-gold-400 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-navy-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">
                    {t(`${g}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {t(`${g}Desc`)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-navy-50">
        <div className="container-main max-w-3xl">
          <SectionHeading title={t("faqTitle")} />
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq} delay={i * 0.08}>
                <div className="rounded-xl border border-navy-200 bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="pr-4 font-heading text-base font-bold text-navy-900">
                      {t(`${faq}Q`)}
                    </span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-navy-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-navy-100 px-6 py-4">
                      <p className="text-sm leading-relaxed text-navy-600">
                        {t(`${faq}A`)}
                      </p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding">
        <div className="container-main max-w-2xl text-center">
          <SectionHeading
            title={t("newsletterTitle")}
            subtitle={t("newsletterDesc")}
          />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex gap-3"
          >
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="flex-1 rounded-lg border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
            />
            <button
              type="submit"
              className="rounded-lg gold-gradient px-6 py-3 font-semibold text-navy-900 transition-transform hover:scale-105"
            >
              {t("subscribe")}
            </button>
          </form>
        </div>
      </section>

      {/* Downloads */}
      <section className="section-padding bg-navy-50">
        <div className="container-main max-w-2xl">
          <SectionHeading title={t("downloadTitle")} />
          <div className="mt-8 space-y-3">
            {downloads.map((d, i) => (
              <AnimatedSection key={d} delay={i * 0.1}>
                <div className="flex items-center gap-4 rounded-xl border border-navy-200 bg-white px-6 py-4 shadow-sm transition-all hover:border-gold-400">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-navy-700">{t(d)}</span>
                </div>
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
