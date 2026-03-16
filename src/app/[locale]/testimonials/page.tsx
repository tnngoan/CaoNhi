"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/data/testimonials";

export default function TestimonialsPage() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as "en" | "vi";

  const featured = testimonials.find((t) => t.featured);
  const others = testimonials.filter((t) => !t.featured);

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

      {/* Featured */}
      {featured && (
        <section className="section-padding">
          <div className="container-main max-w-3xl">
            <AnimatedSection>
              <div className="text-center">
                <span className="inline-block rounded-full gold-gradient px-4 py-1 text-xs font-bold text-navy-900">
                  {t("featuredLabel")}
                </span>
              </div>
              <TestimonialCard
                name={featured.name}
                role={featured.role[locale]}
                quote={featured.quote[locale]}
                rating={featured.rating}
                featured
              />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="section-padding bg-navy-50 pt-8">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((testimonial, i) => (
              <AnimatedSection key={testimonial.name} delay={i * 0.08}>
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role[locale]}
                  quote={testimonial.quote[locale]}
                  rating={testimonial.rating}
                />
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
