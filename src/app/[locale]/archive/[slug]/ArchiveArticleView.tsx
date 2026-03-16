"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FloatingReactions from "@/components/ui/FloatingReactions";
import ArticleCard from "@/components/ui/ArticleCard";
import type { Article } from "@/lib/data/articles";
import { categoryLabels } from "@/lib/data/articles";

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    // Table rows
    if (line.startsWith("|")) {
      const cells = line
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());

      if (cells.every((c) => /^[-:]+$/.test(c))) return null; // separator

      const isHeader = i > 0;
      // Check if next line is separator to determine if this is header
      const contentLines = content.split("\n");
      const nextLine = contentLines[i + 1];
      const isTableHeader = nextLine && /^\|[\s-:|]+\|$/.test(nextLine.trim());

      return (
        <tr key={i} className={isTableHeader ? "bg-navy-50 font-bold" : ""}>
          {cells.map((cell, j) => (
            <td
              key={j}
              className="border border-navy-200 px-3 py-2 text-sm text-navy-700"
            >
              {cell.replace(/\*\*(.*?)\*\*/g, "$1")}
            </td>
          ))}
        </tr>
      );
    }

    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-10 mb-4 font-heading text-2xl font-bold text-navy-900">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-6 mb-3 font-heading text-xl font-bold text-navy-800">
          {line.replace("### ", "")}
        </h3>
      );
    }

    // Bold list items: - **Key**: Value
    if (line.startsWith("- **")) {
      const match = line.match(/- \*\*(.*?)\*\*:?\s*(.*)/);
      if (match) {
        return (
          <li key={i} className="ml-4 list-disc text-navy-700">
            <strong className="text-navy-800">{match[1]}</strong>
            {match[2] ? `: ${match[2]}` : ""}
          </li>
        );
      }
    }

    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-4 list-disc text-navy-700">
          {renderInline(line.slice(2))}
        </li>
      );
    }

    // Numbered lists
    const numMatch = line.match(/^(\d+)\.\s+\*\*(.*?)\*\*:?\s*(.*)/);
    if (numMatch) {
      return (
        <li key={i} className="ml-4 list-decimal text-navy-700">
          <strong className="text-navy-800">{numMatch[2]}</strong>
          {numMatch[3] ? `: ${numMatch[3]}` : ""}
        </li>
      );
    }
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={i} className="ml-4 list-decimal text-navy-700">
          {renderInline(line.replace(/^\d+\.\s/, ""))}
        </li>
      );
    }

    if (line.trim() === "") return <div key={i} className="h-3" />;

    // Disclaimer/note
    if (line.startsWith("*Lưu ý") || line.startsWith("*Disclaimer")) {
      return (
        <p key={i} className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs italic text-amber-700">
          {line.replace(/^\*/, "").replace(/\*$/, "")}
        </p>
      );
    }

    return (
      <p key={i} className="my-2 leading-relaxed text-navy-700">
        {renderInline(line)}
      </p>
    );
  });
}

function renderInline(text: string) {
  // Handle **bold** and *italic*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-navy-800">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function ArchiveArticleView({
  article,
  related,
  locale,
}: {
  article: Article;
  related: Article[];
  locale: "en" | "vi";
}) {
  const t = useTranslations("archive");

  const dateFormatted = new Intl.DateTimeFormat(
    locale === "vi" ? "vi-VN" : "en-US",
    { year: "numeric", month: "long", day: "numeric", weekday: "long" }
  ).format(new Date(article.publishDate));

  // Check if content has tables (for wrapping in <table>)
  const contentLines = article.content.split("\n");
  const hasTable = contentLines.some((l) => l.startsWith("|"));

  return (
    <>
      <FloatingReactions
        articleId={article.id}
        initialViews={article.views}
        initialLikes={article.likes}
      />

      {/* Hero */}
      <section className="navy-gradient pt-32 pb-16">
        <div className="container-main max-w-4xl">
          <AnimatedSection>
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 text-sm text-navy-400 transition-colors hover:text-gold-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M15 19l-7-7 7-7" />
              </svg>
              {t("backToArchive")}
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-gold-500/20 px-3 py-1 font-medium text-gold-400">
                {categoryLabels[article.category][locale]}
              </span>
              <span className="text-navy-400">{dateFormatted}</span>
              <span className="text-navy-500">·</span>
              <span className="text-navy-400">{article.readTime} phút đọc</span>
              <span className="text-navy-500">·</span>
              <span className="flex items-center gap-1 text-navy-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {article.views} {t("views")}
              </span>
            </div>

            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mt-4 text-sm text-navy-400">
              {t("byAuthor")} · Cao Nhi — MB Securities
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-navy-600 px-2.5 py-0.5 text-xs text-navy-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Related stocks */}
            {article.relatedStocks.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-navy-500">{t("relatedStocks")}:</span>
                {article.relatedStocks.map((ticker) => (
                  <span
                    key={ticker}
                    className="rounded bg-gold-500/20 px-2 py-0.5 text-xs font-bold text-gold-400"
                  >
                    {ticker}
                  </span>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Article content */}
      <section className="section-padding pb-8">
        <div className="container-main max-w-4xl">
          <AnimatedSection>
            <article className="prose prose-lg max-w-none">
              {hasTable ? (
                <div>
                  {(() => {
                    const elements: React.ReactNode[] = [];
                    let tableRows: React.ReactNode[] = [];
                    let inTable = false;

                    contentLines.forEach((line, i) => {
                      if (line.startsWith("|")) {
                        if (!inTable) inTable = true;
                        const row = renderContent(line)[0];
                        if (row) tableRows.push(row);
                      } else {
                        if (inTable) {
                          elements.push(
                            <div key={`table-${i}`} className="my-6 overflow-x-auto">
                              <table className="w-full border-collapse border border-navy-200 text-sm">
                                <tbody>{tableRows}</tbody>
                              </table>
                            </div>
                          );
                          tableRows = [];
                          inTable = false;
                        }
                        const rendered = renderContent(line);
                        elements.push(...rendered.filter(Boolean).map((el, j) =>
                          el && typeof el === "object" && "key" in el
                            ? { ...el, key: `${i}-${j}` }
                            : el
                        ));
                      }
                    });

                    if (inTable && tableRows.length > 0) {
                      elements.push(
                        <div key="table-end" className="my-6 overflow-x-auto">
                          <table className="w-full border-collapse border border-navy-200 text-sm">
                            <tbody>{tableRows}</tbody>
                          </table>
                        </div>
                      );
                    }

                    return elements;
                  })()}
                </div>
              ) : (
                renderContent(article.content)
              )}
            </article>
          </AnimatedSection>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section-padding bg-navy-50 pt-12">
          <div className="container-main">
            <h2 className="font-heading text-2xl font-bold text-navy-900">
              {t("relatedArticles")}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <ArticleCard
                  key={r.id}
                  title={r.title}
                  summary={r.summary}
                  category={r.category}
                  publishDate={r.publishDate}
                  readTime={r.readTime}
                  slug={r.slug}
                  views={r.views}
                  likes={r.likes}
                  tags={r.tags}
                  relatedStocks={r.relatedStocks}
                  locale={locale}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom spacer for mobile reactions bar */}
      <div className="h-16 xl:h-0" />
    </>
  );
}
