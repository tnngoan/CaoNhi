"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Insight } from "@/lib/data/insights";
import { formatDate } from "@/lib/utils";

export default function InsightArticle({
  insight,
  locale,
}: {
  insight: Insight;
  locale: "en" | "vi";
}) {
  const t = useTranslations("insights");

  return (
    <>
      <section className="navy-gradient pt-32 pb-16">
        <div className="container-main max-w-4xl">
          <AnimatedSection>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-navy-400 transition-colors hover:text-gold-400"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              {t("backToInsights")}
            </Link>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-gold-500/20 px-3 py-1 font-medium text-gold-400">
                {insight.category}
              </span>
              <span className="text-navy-400">
                {formatDate(insight.date, locale)} · {insight.readTime}{" "}
                {t("minuteRead")}
              </span>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {insight.title[locale]}
            </h1>
            <p className="mt-4 text-sm text-navy-400">{t("byAuthor")}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <AnimatedSection>
            <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-p:text-navy-700 prose-strong:text-navy-800 prose-li:text-navy-700 prose-a:text-gold-600">
              {insight.content[locale].split("\n").map((line, i) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="mt-8 mb-4 text-2xl font-bold">
                      {line.replace("## ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="mt-6 mb-3 text-xl font-bold">
                      {line.replace("### ", "")}
                    </h3>
                  );
                }
                if (line.startsWith("- **")) {
                  const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
                  if (match) {
                    return (
                      <li key={i} className="ml-4 list-disc">
                        <strong>{match[1]}</strong>: {match[2]}
                      </li>
                    );
                  }
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={i} className="ml-4 list-disc">
                      {line.replace("- ", "")}
                    </li>
                  );
                }
                if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
                  const match = line.match(/\d+\. \*\*(.*?)\*\*: (.*)/);
                  if (match) {
                    return (
                      <li key={i} className="ml-4 list-decimal">
                        <strong>{match[1]}</strong>: {match[2]}
                      </li>
                    );
                  }
                  return (
                    <li key={i} className="ml-4 list-decimal">
                      {line.replace(/^\d+\. /, "")}
                    </li>
                  );
                }
                if (line.startsWith("*") && line.endsWith("*")) {
                  return (
                    <p key={i} className="mt-4 text-sm text-navy-500 italic">
                      {line.replace(/^\*|\*$/g, "")}
                    </p>
                  );
                }
                if (line.trim() === "") return <br key={i} />;
                return (
                  <p key={i} className="my-3">
                    {line}
                  </p>
                );
              })}
            </article>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
